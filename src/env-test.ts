import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if the environment variables are properly loaded
console.log("THIRDWEB_API_KEY:", process.env.THIRDWEB_API_KEY);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Not Loaded");
console.log("AI_AGENT_MARKETPLACE_CONTRACT_ADDRESS:", process.env.AI_AGENT_MARKETPLACE_CONTRACT_ADDRESS);
