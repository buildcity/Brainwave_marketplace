'use client';

import React, { useState } from 'react';
import styles from '@/app/app.module.css';

const ConnectNeurosityButton = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleConnect = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const isValidAccount = email && password;
            if (isValidAccount) {
                setShowModal(false); // Close the modal after login
                setIsConnected(true);
                alert('Account connected successfully!');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error connecting:', error);
            alert('Failed to connect. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
    
        try {
            const fileUrl = URL.createObjectURL(file);  // Generate a local URL for the image
    
            // Store the image and price information
            const item = {
                id: Date.now().toString(),  // Convert timestamp to string as id
                title: file.name,
                media: fileUrl,
                price: 0.25, // Set price to 0.25 NEAR
                isSold: false
            };
    
            window.localStorage.setItem(item.id, JSON.stringify(item)); // Add item to local storage for marketplace
            alert("Item uploaded and listed for 0.25 NEAR!");
        } catch (error) {
            console.error("Error in file upload:", error);
            alert("Failed to upload item. Check console for details.");
        }
    };
    

    return (
        <div className={styles.buttonGroup}>
            <button
                className={styles.connectButton}
                onClick={handleConnect}
                disabled={loading}
            >
                {loading ? 'Connecting...' : 'Connect Account'}
            </button>

            {/* Show file input only if connected */}
            {isConnected && (
                <div>
                    <input
                        type="file"
                        id="fileInput"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                    />
                    <p>Upload a file to list for sale</p>
                </div>
            )}

            {/* Modal for account connection */}
            {showModal && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeButton} onClick={() => setShowModal(false)}>×</button>
                        <h2 className={styles.modalTitle}>Connect to Account</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                            <button
                                type="submit"
                                className={styles.connectButton}
                                disabled={loading}
                            >
                                {loading ? 'Connecting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectNeurosityButton;
