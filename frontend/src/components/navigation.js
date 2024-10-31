'use client';
import '@/app/globals.css';
import { NearContext, Wallet } from '@/wallets/near'; 
import { useState, useEffect } from 'react';

const wallet = new Wallet({ networkId: 'testnet' });

export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <html lang="en">
      <body>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          {children} {/* Removed the Navigation*/}
        </NearContext.Provider>
      </body>
    </html>
  );
}
