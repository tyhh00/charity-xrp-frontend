'use client';

import { useState } from 'react';
import { useXRPLClient } from '@/hooks/useXRPLClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const { connect, disconnect, isConnected, address } = useXRPLClient();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000); // Show success for 2 seconds
    } catch (error) {
      console.error('Failed to connect:', error);
    }
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletInfo(false);
  };

  if (success) {
    return (
      <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-default">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Successfully Connected!
      </button>
    );
  }

  if (isConnected) {
    return (
      <Dialog open={showWalletInfo} onOpenChange={setShowWalletInfo}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-brand-primary/10 border-brand-primary text-brand-primary hover:bg-brand-primary/20"
          >
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black/90 text-white border-brand-primary/20">
          <DialogHeader>
            <DialogTitle>Connected Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Address</label>
              <p className="font-mono text-sm break-all">{address}</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleDisconnect}
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-brand-primary hover:bg-brand-primary/80 text-white"
    >
      {isConnecting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
} 