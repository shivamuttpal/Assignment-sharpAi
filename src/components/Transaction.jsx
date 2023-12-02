import React, { useState } from 'react';

import './mine.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const Transaction = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState(''); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate wallet address and amount before submitting to Firestore
      if (!walletAddress || !walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        // Handle invalid wallet address   
        alert('Invalid wallet address. Please enter a valid Ethereum address.');
        return;
      }

      if (isNaN(amount) || amount < 0 || amount > 10000) {
        // Handle invalid amount
        alert('Invalid amount. Please enter a number between 0 and 10,000.');
        return;
      }

      // Submit data to Firestore
      const transactionData = {
        walletAddress,
        amount: Number(amount), // Convert amount to a number
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firestore.collection('transactions').add(transactionData);

      // Clear form after submission
      setWalletAddress('');
      setAmount('');

      // Optionally, provide user feedback (e.g., success message)
      alert('Transaction submitted successfully!');
    } catch (error) {
      console.error('Error submitting transaction:', error);
      // Handle error (e.g., show an error message to the user)
      alert('Error submitting transaction. Please try again.');
    }
  };
 
  return (
    <div className="container transaction-container">
      <h1>Transaction Page</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Wallet Address:
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            pattern="^0x[a-fA-F0-9]{40}$"
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={0}
            max={10000}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Transaction;
