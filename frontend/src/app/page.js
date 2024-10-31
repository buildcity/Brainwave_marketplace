import styles from './app.module.css';  
import ConnectWalletButton from '@/components/ConnectWalletButton';  

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Centered content: Heading, Description, Wallet Button, and Neurosity Button */}
      <div className={styles.centeredContent}>
        <h1>Welcome to the Future of Brain Data</h1>
        <p>Connect your Neurosity device and wallet to get started</p>
        
        {/* Wallet connection button */}
        <div className={styles.buttonGroup}>
          <ConnectWalletButton />  {/* Wallet Connect Button */}
        </div>
      </div>
      
      {/* Footer section */}
      <footer className={styles.footer}>
        <p>© 2024 BuildCity Brain Wave Data Market</p>
      </footer>
    </main>
  );
}
