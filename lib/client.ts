import { createThirdwebClient } from "@thirdweb-dev/react";

// ✅ Use environment variables from .env.local
const clientId = process.env.NEXT_PUBLIC_TW_CLIENT_ID as string;
const secretKey = process.env.THIRDWEB_SECRET_KEY as string;

// ❗️Safety check: Throw an error if either is missing
if (!clientId || !secretKey) {
  throw new Error("❌ Missing Thirdweb credentials in .env.local");
}

// ✅ Create and export the client
const client = createThirdwebClient({
  clientId,
  secretKey,
});

export default client;
