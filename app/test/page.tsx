'use client';

import { useState, useEffect } from 'react';
import { useXRPLClient } from '@/hooks/useXRPLClient';
import sdk from '@crossmarkio/sdk';

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [ledgerInfo, setLedgerInfo] = useState<any>(null);
  const { connect, isConnected, address } = useXRPLClient();
  const [charityAddress, setCharityAddress] = useState('rNixerUVPwrhxGDt4UooDu6FJ7zuofvjCF');
  const [amount, setAmount] = useState('1');
  const [txHash, setTxHash] = useState<string | null>(null);

  // Fetch ledger info on page load
  useEffect(() => {
    async function fetchLedgerInfo() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_AIDSAFE_BACKEND_URL + '/api/xrpl-test');
        const data = await response.json();
        if (data.status === 'success') {
          setLedgerInfo(data.ledgerInfo);
        }
      } catch (err) {
        console.error('Failed to fetch ledger info:', err);
      }
    }
    
    fetchLedgerInfo();
  }, []);

  // Handle donation process
  const handleDonate = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setTxHash(null);

    try {
      // Step 1: Prepare the transaction
      const prepareResponse = await fetch(process.env.NEXT_PUBLIC_AIDSAFE_BACKEND_URL + '/api/donate/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorAddress: address,
          charityAddress: charityAddress,
          amount: amount
        })
      });
      
      const prepareData = await prepareResponse.json();
      
      if (prepareData.status !== 'success') {
        throw new Error(prepareData.message || 'Failed to prepare transaction');
      }
      
      // Step 2: Sign the transaction with Crossmark wallet
      const signResponse = await sdk.async.signAndWait(prepareData.unsignedTx);
      
      if (!signResponse || !signResponse.response.data.txBlob) {
        throw new Error('Failed to sign transaction');
      }
      
      // Step 3: Submit the signed transaction
      const submitResponse = await fetch(process.env.NEXT_PUBLIC_AIDSAFE_BACKEND_URL + '/api/donate/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signedTx: signResponse.response.data.txBlob
        })
      });
      
      const submitData = await submitResponse.json();
      
      if (submitData.status !== 'success') {
        throw new Error(submitData.message || 'Failed to submit transaction');
      }
      
      setSuccess('Donation successfully sent to the charity!');
      setTxHash(submitData.txHash);
      
    } catch (err) {
      console.error('Donation error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark to-black text-brand-light p-8">
      <div className="max-w-2xl mx-auto bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
          AidSafe Test Transaction
        </h1>
        
        {/* Wallet Connection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
          {isConnected ? (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p>Connected: <span className="font-mono">{address}</span></p>
            </div>
          ) : (
            <button 
              onClick={connect}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-full transition-all"
            >
              Connect Wallet
            </button>
          )}
        </div>
        
        {/* XRPL Info */}
        {ledgerInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">XRPL Connection</h2>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p>Ledger Index: {ledgerInfo.ledger_index}</p>
              <p>Ledger Hash: <span className="font-mono text-sm">{ledgerInfo.ledger_hash}</span></p>
            </div>
          </div>
        )}
        
        {/* Donation Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Donate RLUSD</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Charity Address</label>
              <input
                type="text"
                value={charityAddress}
                onChange={(e) => setCharityAddress(e.target.value)}
                className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount (RLUSD)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-black/50 border border-white/20 rounded-lg text-white"
              />
            </div>
            
            <button
              onClick={handleDonate}
              disabled={loading || !isConnected}
              className={`w-full py-3 px-6 rounded-full font-medium transition-all ${
                loading || !isConnected
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-brand-primary hover:bg-brand-primary/80 text-white'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Send Donation'
              )}
            </button>
          </div>
        </div>
        
        {/* Feedback Messages */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 mb-4">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200">
            <p className="font-medium">Success:</p>
            <p>{success}</p>
            {txHash && (
              <p className="mt-2">
                Transaction Hash: <span className="font-mono text-sm break-all">{txHash}</span>
              </p>
            )}
            <a 
              href={`https://testnet.xrpl.org/transactions/${txHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-2 text-brand-primary hover:underline"
            >
              View on XRPL Explorer →
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 