'use client';  

import '@/app/globals.css';  
import { NearContext, Wallet } from '@/wallets/near';  
import { useEffect, useState } from 'react';  
import styles from './app.module.css';  

const wallet = new Wallet({ networkId: 'testnet' });  // Initialize wallet

export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => {
    wallet.startUp(setSignedAccountId);  // Call the wallet startup logic
  }, []);

  return (
    <html lang="en">
      <body>
        {/* BuildCity logo*/}
        <header className={styles.header}>
          <a href="https://buildcity.xyz" target="_blank" rel="noopener noreferrer">
            <img src="/buildcity-logo.png" alt="BuildCity Logo" className={styles.logo} />
          </a>
        </header>

        {/* Near*/}
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          {children}  
        </NearContext.Provider>
      </body>
    </html>
  );
}
