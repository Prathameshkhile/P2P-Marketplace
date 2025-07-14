import React, { useState, useEffect } from "react";
import { Test } from "./Components/Test/Test";
import { getContract } from "./contract";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [str, setStr] = useState("");

  // 📌 Check Wallet Connection
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkWalletConnection();
  }, []);

  // 📌 Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  //test contract
  const testContract = async () => {
    try {
      const contract = await getContract();
      const status = await contract.status();
      setStr(status);
    } catch (error) {
      console.error("Unable to fetch from contract:", error);
      setStr("Error fetching from contract.");
    }
  };

  return (
    <div className="App">
      <Test />
      {account ? (
        <p className="acc">
          ✅ {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <button onClick={testContract}>Test contract</button>
      <h2>{str}</h2>
    </div>
  );
}

export default App;
