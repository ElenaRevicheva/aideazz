import { createThirdwebClient } from "@thirdweb-dev/react";

// ✅ Load credentials from .env.local
const clientId = process.env.NEXT_PUBLIC_TW_CLIENT_ID as string;
const secretKey = process.env.THIRDWEB_SECRET_KEY as string;

if (!clientId || !secretKey) {
  throw new Error("❌ Missing Thirdweb credentials in .env.local");
}

// ✅ Export named client (not default)
export const client = createThirdwebClient({
  clientId,
  secretKey,
});
