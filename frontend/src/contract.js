import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
const contractABI = [
  // Paste your ABI here
  {
    inputs: [],
    name: "status",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const getContract = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  // Create a provider using the browser's Ethereum provider (MetaMask)
  const provider = new BrowserProvider(window.ethereum);

  // Request account access
  await provider.send("eth_requestAccounts", []);

  // Get the signer (connected wallet)
  const signer = await provider.getSigner();

  // Create and return the contract instance
  return new Contract(contractAddress, contractABI, signer);
};
export default getContract;
