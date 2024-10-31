'use client';  

import { useContext, useEffect } from 'react';
import { NearContext } from '@/wallets/near'; 
import styles from '@/app/app.module.css';  
import { useRouter } from 'next/navigation';  

const ConnectWalletButton = () => {
  const { wallet, signedAccountId } = useContext(NearContext);  // Access wallet and account ID
  const router = useRouter();  // Initialize the router

  // Handle redirection based on wallet connection status
  useEffect(() => {
    if (signedAccountId) {
      router.push('/marketplace');  // Redirect to marketplace if signed in
    }
  }, [signedAccountId, router]);

  const action = signedAccountId ? wallet.signOut : wallet.signIn;

  return (
    <button className={styles.connectButton} onClick={action}>
      {signedAccountId ? `Logout ${signedAccountId}` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
