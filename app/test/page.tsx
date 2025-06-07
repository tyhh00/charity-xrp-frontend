'use client';

import { useState, useEffect } from 'react';
import { useXRPLClient } from '@/hooks/useXRPLClient';
import sdk from '@crossmarkio/sdk';
import { motion, AnimatePresence } from "framer-motion";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [ledgerInfo, setLedgerInfo] = useState<any>(null);
  const { connect, disconnect, isConnected, address } = useXRPLClient();
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
      try {
        // Try to connect wallet first if not already connected
        await connect();
      } catch (err) {
        setError('Please connect your wallet first');
        return;
      }
    }

    // If still not connected after trying, return
    if (!isConnected || !address) {
      setError('Wallet connection required');
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
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-2xl mx-auto bg-[#fff0f0] border border-[#ffd6d6] rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 text-[#cb2121]">
          AidSafe Test Transaction
        </h1>
        
        {/* Wallet Connection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
          {isConnected ? (
            <div className="p-4 bg-white rounded-lg border border-[#ffd6d6]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-medium">Connected</span>
              </div>
              <p className="font-mono text-sm break-all text-gray-600">{address}</p>
              <motion.button
                onClick={disconnect}
                className="mt-3 px-4 py-1.5 text-sm rounded-md border border-[#cb2121] text-[#cb2121] hover:bg-[#fff0f0] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Disconnect
              </motion.button>
            </div>
          ) : (
            <motion.button 
              onClick={connect}
              className="px-6 py-3 bg-[#cb2121] hover:bg-[#a81b1b] text-white rounded-full transition-all shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Wallet
            </motion.button>
          )}
        </div>
        
        {/* XRPL Info */}
        {ledgerInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">XRPL Connection</h2>
            <div className="p-4 bg-white rounded-lg border border-[#ffd6d6]">
              <div className="mb-2">
                <span className="text-gray-500 text-sm">Ledger Index:</span>
                <span className="font-medium ml-2">{ledgerInfo.ledger_index}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Ledger Hash:</span>
                <span className="font-mono text-xs ml-2 break-all text-gray-600">{ledgerInfo.ledger_hash}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Donation Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Donate RLUSD</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Charity Address</label>
              <input
                type="text"
                value={charityAddress}
                onChange={(e) => setCharityAddress(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#cb2121]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Amount (RLUSD)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#cb2121]"
              />
            </div>
            
            <motion.button
              onClick={handleDonate}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-full font-medium transition-all shadow-md ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#cb2121] hover:bg-[#a81b1b] text-white'
              }`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Send Donation'
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Feedback Messages */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {success && (
            <motion.div 
              className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
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
                className="block mt-2 text-[#cb2121] hover:underline"
              >
                View on XRPL Explorer →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}