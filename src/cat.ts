import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// Use your private key here (Never expose this publicly!)
const privateKey = "e0a4542c45e071775319f84977daa0510815516104a9f54c4606668a0d10214e"; // Your private key
const wallet = new ethers.Wallet(privateKey);
const sdk = new ThirdwebSDK(wallet);

const checkClient = async () => {
  try {
    // This will log the connected wallet's address to check if the client works
    const address = await wallet.getAddress();
    console.log("Wallet Address: ", address);

    // Attempt to fetch the current block number to confirm the SDK is interacting with the chain
    const blockNumber = await sdk.chain.getBlockNumber();
    console.log("Current Block Number: ", blockNumber);
  } catch (error) {
    console.error("Error with Thirdweb Client: ", error);
  }
};

checkClient();
