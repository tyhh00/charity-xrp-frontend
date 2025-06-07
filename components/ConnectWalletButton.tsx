'use client';

import { useState, useEffect } from 'react';
import { useXRPLClient } from '@/hooks/useXRPLClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const { connect, disconnect, isConnected, address, checkConnection } = useXRPLClient();

  // Check for existing connection when component mounts
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        await checkConnection();
      } catch (error) {
        console.error('Failed to check connection:', error);
      } finally {
        setInitialCheckDone(true);
      }
    };
    
    checkExistingConnection();
  }, [checkConnection]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect to wallet');
      
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletInfo(false);
  };

  // Show loading state while checking for existing connection
  if (!initialCheckDone) {
    return (
      <motion.button
        disabled={true}
        className="px-6 py-2 rounded-full bg-gray-200 text-gray-500 font-medium shadow-sm flex items-center gap-2"
      >
        <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Checking...
      </motion.button>
    );
  }

  if (isConnected) {
    return (
      <Dialog open={showWalletInfo} onOpenChange={setShowWalletInfo}>
        <DialogTrigger asChild>
          <motion.button 
            className="px-6 py-2 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#fff0f0] font-medium transition-all shadow-sm flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-6 shadow-lg border border-[#ffd6d6]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#cb2121]">Connected Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-[#fff0f0] p-4 rounded-lg">
              <label className="text-sm text-gray-500">Address</label>
              <p className="font-mono text-sm break-all text-gray-700">{address}</p>
            </div>
            
            <div className="bg-[#fff0f0] p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Your Balance</div>
              <div className="text-lg font-bold text-black">5,000 RLUSD</div>
            </div>
            
            <motion.button 
              onClick={handleDisconnect}
              className="w-full py-3 rounded-md bg-[#cb2121] hover:bg-[#a81b1b] text-white font-semibold transition-all shadow-md mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Disconnect Wallet
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleConnect}
        disabled={isConnecting}
        className="px-6 py-2 rounded-full bg-[#cb2121] hover:bg-[#a81b1b] text-white font-medium transition-all shadow-md disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isConnecting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </div>
        ) : (
          'Connect Wallet'
        )}
      </motion.button>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-100 text-red-700 text-sm rounded-md border border-red-200 text-center shadow-md"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 