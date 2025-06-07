'use client';

import { useState, useEffect } from 'react';
import sdk from '@crossmarkio/sdk';

export function useXRPLClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is already connected on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionUser = sdk.session.user?.id;
      if (sessionUser) {
        setUserId(sessionUser);
        setIsConnected(true);
      }
    };
    checkSession();
  }, []);

  const connect = async () => {
    try {
      const response = await sdk.async.signInAndWait();
      const userAddress = response.response.data.address;
      setAddress(userAddress);
      setIsConnected(true);
      return userAddress;
    } catch (error) {
      console.error('Failed to connect to Crossmark:', error);
      throw error;
    }
  };

  const sendPayment = async (destination: string, amount: string) => {
    if (!address) throw new Error('Not connected');

    try {
      // Sign the transaction
      const signResponse = await sdk.async.signAndWait({
        TransactionType: "Payment",
        Account: address,
        Destination: destination,
        Amount: amount, // Amount in drops (1 XRP = 1,000,000 drops)
      });

      // Submit the signed transaction
      const submitResponse = await sdk.async.submitAndWait(
        address,
        signResponse.response.data.txBlob
      );

      return submitResponse.response.data.resp.result.hash;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setUserId(null);
    // Add any cleanup needed
  };

  return {
    connect,
    disconnect,
    sendPayment,
    isConnected,
    address,
    userId,
  };
} 