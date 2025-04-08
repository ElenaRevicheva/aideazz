import { AptosAccount } from "aptos";

const account = new AptosAccount();

console.log("✅ APTOS_PRIVATE_KEY:", account.toPrivateKeyObject().privateKeyHex);
console.log("📬 APTOS_PUBLIC_ADDRESS:", account.address().toString());
