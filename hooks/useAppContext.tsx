import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType {
  isOnlineMode: boolean;
  setIsOnlineMode: (isOnline: boolean) => void;
  userPin: string;
  setUserPin: (pin: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  balance: {
    SOL: number;
    USDC: number;
    USDT: number;
    PYUSD: number;
  };
  setBalance: (balance: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isOnlineMode, setIsOnlineMode] = useState(true);
  const [userPin, setUserPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [balance, setBalance] = useState({
    SOL: 1.2345,
    USDC: 100.00,
    USDT: 50.25,
    PYUSD: 25.50,
  });

  return (
    <AppContext.Provider value={{
      isOnlineMode,
      setIsOnlineMode,
      userPin,
      setUserPin,
      phoneNumber,
      setPhoneNumber,
      balance,
      setBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 