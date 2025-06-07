'use client';

import { useState, useEffect } from 'react';
import sdk from '@crossmarkio/sdk';

export function useXRPLClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for existing connection
  useEffect(() => {
    const checkConnection = async () => {
      if (sdk.session.user) {
        setIsConnected(true);
        setAddress(sdk.session.user.id);
      }
    };
    
    checkConnection();
  }, []);

  const connect = async () => {
    if (isConnected) return address;
    
    setIsConnecting(true);
    try {
      const response = await sdk.async.signInAndWait();
      const userAddress = response.response.data.address;
      setAddress(userAddress);
      setIsConnected(true);
      return userAddress;
    } catch (error) {
      console.error('Failed to connect to Crossmark:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    // Crossmark doesn't have a direct logout/disconnect function
    // We can just clear our local state
    setIsConnected(false);
    setAddress(null);
  };

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    address,
  };
} 