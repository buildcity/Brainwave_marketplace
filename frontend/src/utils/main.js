import {Contract } from 'near-api-js';
import dotenv from 'dotenv';

dotenv.config();

export async function initNear() {
  const nearConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  const near = await connect(nearConfig);
  
  // Pass a unique appKeyPrefix for your application
  const wallet = new WalletConnection(near, 'brainwave-marketplace'); // Add appKeyPrefix here

  return { wallet };
}

export async function purchaseItem(receiverId) {
  try {
    const account = wallet.account();
    console.log(`Charging 0.25 NEAR to ${receiverId}`);

    // Send 0.25 NEAR to the specified receiver
    await account.sendMoney(receiverId, "250000000000000000000000"); // 0.25 NEAR in yoctoNEAR
  } catch (error) {
    console.error("Error in purchaseItem function:", error);
    throw error;
  }
}





// EEG capture and processing function
export async function captureAndSaveEEGData() {
  const neurosity = new Neurosity({
    deviceId: process.env.NEUROSITY_DEVICE_ID
  });

  await neurosity.login({
    email: process.env.NEUROSITY_EMAIL,
    password: process.env.NEUROSITY_PASSWORD
  });

  const rawData = [];
  const fft = new FFT(128); // Example sampling rate, adjust as needed

  const callback = (data) => {
    rawData.push(data);
  };

  const unsubscribe = neurosity.brainwavesRawUnfiltered(callback);

  console.log("Capturing EEG data...");

  // Record EEG data for 30 seconds
  await new Promise(resolve => setTimeout(resolve, 30000));

  unsubscribe();
  console.log("EEG capture stopped.");

  // Perform FFT on the EEG data
  const processedData = rawData.map(channelData => {
    const complexArray = fft.createComplexArray();
    fft.realTransform(complexArray, channelData.data);
    fft.completeSpectrum(complexArray);
    return complexArray;
  });

  // Use a browser-compatible way to handle the file
  const eegData = { rawData, processedData };
  const blob = new Blob([JSON.stringify(eegData, null, 4)], { type: 'application/json' });

  return blob;
}

// Function to store EEG metadata on NEAR
export async function storeEEGMetadataOnNear(contract, index, nftLink, eegIpfsHash, subjectData) {
  try {
    const metadata = {
      index,
      nftLink,
      eegIpfsHash,
      ...subjectData
    };

    await contract.storeEEGMetadata({ metadata });
    console.log("Metadata stored on NEAR blockchain:", metadata);
  } catch (error) {
    console.error("Error storing metadata on NEAR:", error);
    throw error;
  }
}

// Function to create the main .fif structure and store metadata on NEAR
export async function processEEGData(filePath, nftLink, subjectData) {
  try {
    const { contract } = await initNear();
    const eegIpfsHash = await uploadFifToIPFS(filePath);
    const index = 1; // Update as needed
    await storeEEGMetadataOnNear(contract, index, nftLink, eegIpfsHash, subjectData);
  } catch (error) {
    console.error("Error processing EEG data:", error);
  }
}
