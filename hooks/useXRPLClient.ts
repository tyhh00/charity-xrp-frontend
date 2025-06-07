'use client';

import { useState, useEffect, useCallback } from 'react';
import sdk from '@crossmarkio/sdk';

// Simple event emitter for wallet connections
const walletEvents = {
  listeners: new Set<(address: string | null, connected: boolean) => void>(),
  
  subscribe: (callback: (address: string | null, connected: boolean) => void) => {
    walletEvents.listeners.add(callback);
    return () => {
      walletEvents.listeners.delete(callback);
      return undefined;
    };
  },
  
  emit: (address: string | null, connected: boolean) => {
    walletEvents.listeners.forEach(callback => callback(address, connected));
  }
};

// Export the event subscription so components can listen
export const subscribeToWalletEvents = walletEvents.subscribe;

export function useXRPLClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Define checkConnection as a useCallback to ensure stable reference
  const checkConnection = useCallback(async () => {
    try {
      if (sdk.session && sdk.session.user) {
        const userAddress = sdk.session.user.id;
        setIsConnected(true);
        setAddress(userAddress);
        // Emit connection event
        walletEvents.emit(userAddress, true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking connection status:', error);
      return false;
    }
  }, []);

  // Check for existing connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const connect = async () => {
    if (isConnected) return address;
    
    setIsConnecting(true);
    try {
      const response = await sdk.async.signInAndWait();
      const userAddress = response.response.data.address;
      console.log('Connected to Crossmark with address:', userAddress);
      setAddress(userAddress);
      setIsConnected(true);
      // Emit connection event
      walletEvents.emit(userAddress, true);
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
    // Emit disconnection event
    walletEvents.emit(null, false);
  };

  return {
    connect,
    disconnect,
    checkConnection,
    isConnected,
    isConnecting,
    address,
  };
} 