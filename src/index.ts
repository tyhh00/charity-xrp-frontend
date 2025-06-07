import { Router } from 'itty-router';
import { xrpl, Wallet } from 'xrpl';
import { createHash } from 'crypto';

const router = Router();

// XRP Ledger setup
const client = new xrpl.Client('wss://xrplcluster.com');

// Utility functions
const hexToString = (hex: string) => Buffer.from(hex, 'hex').toString('utf8');
const stringToHex = (str: string) => Buffer.from(str, 'utf8').toString('hex').toUpperCase();

// Initialize client connection
async function ensureConnection() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

// 1. Create Charity Account and Setup
router.post('/api/charity/create', async (request, env) => {
  await ensureConnection();
  
  const { charityName, description, adminWallet } = await request.json();
  
  try {
    // Create charity wallet
    const charityWallet = Wallet.generate();
    
    // Fund charity account (you'll need to fund this manually or use a faucet for testnet)
    const fundTx = {
      TransactionType: 'Payment',
      Account: adminWallet,
      Destination: charityWallet.address,
      Amount: '20000000', // 20 XRP for account reserve
      Memos: [{
        Memo: {
          MemoType: stringToHex('charity_creation'),
          MemoData: stringToHex(JSON.stringify({
            name: charityName,
            description: description,
            created: Date.now()
          }))
        }
      }]
    };
    
    return new Response(JSON.stringify({
      charityAddress: charityWallet.address,
      charitySeed: charityWallet.seed, // Store securely!
      transaction: fundTx
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 2. Deposit to Charity Escrow (On-Chain)
router.post('/api/deposit', async (request, env) => {
  await ensureConnection();
  
  const { charityAddress, amount, donorAddress, duration = 31536000 } = await request.json(); // 1 year default
  
  try {
    // Create condition hash for escrow release
    const condition = createHash('sha256')
      .update(`charity_release_${charityAddress}_${Date.now()}`)
      .digest('hex')
      .toUpperCase();
    
    const escrowTx = {
      TransactionType: 'EscrowCreate',
      Account: donorAddress,
      Destination: charityAddress,
      Amount: amount,
      Condition: condition,
      CancelAfter: Math.floor(Date.now() / 1000) + duration,
      Memos: [{
        Memo: {
          MemoType: stringToHex('charity_donation'),
          MemoData: stringToHex(JSON.stringify({
            charity: charityAddress,
            donor: donorAddress,
            amount: amount,
            timestamp: Date.now()
          }))
        }
      }]
    };
    
    return new Response(JSON.stringify({ 
      transaction: escrowTx,
      condition: condition,
      escrowId: `${donorAddress}_${charityAddress}_${Date.now()}`
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 3. Create Proposal as NFT
router.post('/api/proposal/create', async (request, env) => {
  await ensureConnection();
  
  const { charityAddress, charitySeed, totalCost, description, votingPeriod } = await request.json();
  
  try {
    const charityWallet = Wallet.fromSeed(charitySeed);
    
    // Create unique NFT for proposal
    const proposalId = `PROP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const nftMintTx = {
      TransactionType: 'NFTokenMint',
      Account: charityWallet.address,
      NFTokenTaxon: 1, // Proposal category
      Flags: 8, // Transferable
      URI: stringToHex(JSON.stringify({
        proposalId: proposalId,
        charity: charityAddress,
        totalCost: totalCost,
        description: description,
        votingStart: Date.now(),
        votingEnd: Date.now() + (votingPeriod * 1000),
        status: 'active',
        votes: {},
        totalVoteWeight: 0
      }))
    };
    
    // Sign and submit transaction
    const prepared = await client.autofill(nftMintTx);
    const signed = charityWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    
    return new Response(JSON.stringify({
      proposalId: proposalId,
      nftId: result.result.meta.nftoken_id,
      transactionHash: result.result.hash,
      success: true
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 4. Vote on Proposal (Store vote as transaction memo)
router.post('/api/proposal/vote', async (request, env) => {
  await ensureConnection();
  
  const { proposalNftId, voterAddress, voteChoice, voteWeight } = await request.json();
  
  try {
    // Get voter's donation history to this charity
    const accountTx = await client.request({
      command: 'account_tx',
      account: voterAddress,
      ledger_index_min: -1,
      ledger_index_max: -1
    });
    
    // Calculate vote weight based on donations
    let totalDonated = 0;
    accountTx.result.transactions.forEach(tx => {
      if (tx.tx.TransactionType === 'EscrowCreate' && 
          tx.tx.Memos && 
          tx.tx.Memos[0]?.Memo?.MemoType === stringToHex('charity_donation')) {
        totalDonated += parseInt(tx.tx.Amount);
      }
    });
    
    if (totalDonated === 0) {
      return new Response(JSON.stringify({ error: 'Must donate to vote' }), { status: 403 });
    }
    
    // Create vote transaction
    const voteTx = {
      TransactionType: 'Payment',
      Account: voterAddress,
      Destination: voterAddress, // Self-payment of 1 drop
      Amount: '1',
      Memos: [{
        Memo: {
          MemoType: stringToHex('proposal_vote'),
          MemoData: stringToHex(JSON.stringify({
            proposalNftId: proposalNftId,
            vote: voteChoice,
            weight: Math.min(voteWeight, totalDonated), // Cap at donation amount
            timestamp: Date.now()
          }))
        }
      }]
    };
    
    return new Response(JSON.stringify({
      transaction: voteTx,
      voteWeight: Math.min(voteWeight, totalDonated),
      eligibleAmount: totalDonated
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 5. Get Proposal Status
router.get('/api/proposal/:nftId', async (request, env) => {
  await ensureConnection();
  
  const { nftId } = request.params;
  
  try {
    // Get NFT details
    const nftInfo = await client.request({
      command: 'nft_info',
      nft_id: nftId
    });
    
    const proposalData = JSON.parse(hexToString(nftInfo.result.uri));
    
    // Get all votes for this proposal
    const allTx = await client.request({
      command: 'ledger_data',
      ledger_index: 'validated',
      type: 'state'
    });
    
    // Filter for vote transactions (this is simplified - you'd want to optimize this)
    let totalVotes = 0;
    let yesVotes = 0;
    
    // In a real implementation, you'd index these votes more efficiently
    
    return new Response(JSON.stringify({
      proposal: proposalData,
      totalVotes: totalVotes,
      yesVotes: yesVotes,
      status: Date.now() > proposalData.votingEnd ? 'ended' : 'active'
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 6. Claim Funds (Release Escrow)
router.post('/api/claim', async (request, env) => {
  await ensureConnection();
  
  const { proposalNftId, charityAddress, charitySeed, escrowSequence, condition, fulfillment } = await request.json();
  
  try {
    const charityWallet = Wallet.fromSeed(charitySeed);
    
    // Create escrow finish transaction
    const claimTx = {
      TransactionType: 'EscrowFinish',
      Account: charityWallet.address,
      Owner: charityAddress,
      OfferSequence: escrowSequence,
      Condition: condition,
      Fulfillment: fulfillment,
      Memos: [{
        Memo: {
          MemoType: stringToHex('fund_claim'),
          MemoData: stringToHex(JSON.stringify({
            proposalNftId: proposalNftId,
            claimedAt: Date.now()
          }))
        }
      }]
    };
    
    // Sign and submit
    const prepared = await client.autofill(claimTx);
    const signed = charityWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    
    return new Response(JSON.stringify({
      success: true,
      transactionHash: result.result.hash,
      claimedAmount: result.result.meta.delivered_amount
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// 7. Get Charity Analytics
router.get('/api/charity/:address/analytics', async (request, env) => {
  await ensureConnection();
  
  const { address } = request.params;
  
  try {
    // Get all transactions for this charity
    const accountTx = await client.request({
      command: 'account_tx',
      account: address,
      ledger_index_min: -1,
      ledger_index_max: -1
    });
    
    let totalReceived = 0;
    let totalClaimed = 0;
    let activeProposals = 0;
    
    accountTx.result.transactions.forEach(tx => {
      if (tx.tx.TransactionType === 'EscrowFinish') {
        totalClaimed += parseInt(tx.tx.Amount || tx.meta.delivered_amount);
      }
      if (tx.tx.TransactionType === 'NFTokenMint') {
        activeProposals++;
      }
    });
    
    // Get escrows pointing to this charity
    const escrows = await client.request({
      command: 'account_objects',
      account: address,
      type: 'escrow'
    });
    
    escrows.result.account_objects.forEach(escrow => {
      totalReceived += parseInt(escrow.Amount);
    });
    
    return new Response(JSON.stringify({
      totalReceived: totalReceived,
      totalClaimed: totalClaimed,
      activeProposals: activeProposals,
      availableFunds: totalReceived - totalClaimed
    }));
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// Handle all requests
export default {
  async fetch(request, env) {
    try {
      return await router.handle(request, env);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal server error' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}; 