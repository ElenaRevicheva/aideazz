import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_TW_CLIENT_ID;
const secretKey = process.env.TW_SECRET_KEY;

if (!clientId && !secretKey) {
  throw new Error("Client ID or Secret Key not set");
}

const client = createThirdwebClient(
  secretKey ? { secretKey } : { clientId }
);

export default client;
