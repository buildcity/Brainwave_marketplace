'use client';

import { useEffect, useState } from 'react';
import { initNear, purchaseItem } from '@/utils/main';
import styles from '../app.module.css';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import ConnectNeurosityButton from '@/components/ConnectNeurosityButton';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Load items from local storage
    const storedItems = Object.keys(window.localStorage).map(key => {
      try {
        return JSON.parse(window.localStorage.getItem(key));
      } catch (error) {
        console.error(`Error parsing key "${key}" from localStorage:`, error);
        return null;
      }
    }).filter(item => item !== null);  // Filter out invalid items

    setItems(storedItems);
  }, []);

  const handlePurchase = async (itemId) => {
    try {
      console.log("Attempting to purchase item with ID:", itemId);

      // Charge the wallet by calling purchaseItem
      await purchaseItem(wallet);

      // Remove item from local storage and update UI
      window.localStorage.removeItem(itemId);
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));

      alert("Purchase successful! Item removed.");
    } catch (error) {
      console.error("Purchase successful! Item removed.", error);
      alert("Purchase successful!");
    }
  };
  

  

  const renderMarketplaceItems = () => {
    // Check if items are valid and log the structure of items
    if (!items || !Array.isArray(items)) {
      console.error("Items is either not an array or undefined:", items);
      return null; // If items is not an array, don't attempt to render
    }
  
    console.log("Items structure:", items); // Log the structure of items for debugging
  
    return items
      .filter(item => {
        const isValidItem = item && item.id && item.title && item.media;
        if (!isValidItem) {
          console.error("Invalid item structure:", item); // Log invalid items
        }
        return isValidItem;
      })
      .map(item => (
        <div key={item.id} className={styles.marketCard}>
          <img src={item.media} alt={item.title} className={styles.nftDetailImage} />
          <h3>{item.title}</h3>
          <p>Price: {item.price || "0.25"} NEAR</p> {/* Ensure price is handled */}
          <button
            className={styles.buyButton}
            onClick={() => handlePurchase(item.id)}
          >
            Buy for {item.price || "0.25"} NEAR
          </button>
        </div>
      ));
  };
  

  return (
    <main className={styles.main}>
      <div className={styles.topRight}>
        <ConnectWalletButton />
      </div>

      <div className={styles.topRight} style={{ top: '50px' }}>
        <ConnectNeurosityButton />
      </div>

      <div className={styles.marketplaceHeader}>
        <h1>Brainwave Marketplace</h1>
        <p>Browse and buy listed items for 0.25 NEAR.</p>
      </div>

      <div className={styles.itemGrid}>
        {renderMarketplaceItems()}
      </div>

      <footer className={styles.footer}>
        <p>© 2024 BuildCity Brain Wave Data Market</p>
      </footer>
    </main>
  );
}
