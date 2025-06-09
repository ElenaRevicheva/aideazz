import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";
import { WalletContractV4, TonClient, Address } from "ton";
import { Buffer } from "buffer";

const mnemonic = await mnemonicNew();
const keyPair = await mnemonicToPrivateKey(mnemonic);

// Generate wallet from public key
const wallet = WalletContractV4.create({
  workchain: 0,
  publicKey: keyPair.publicKey,
});

// Get address
const address = wallet.address;

console.log("🪬 Mnemonic:", mnemonic.join(" "));
console.log("🔐 TON_PRIVATE_KEY:", Buffer.from(keyPair.secretKey).toString("hex"));
console.log("🔓 Public Key:", Buffer.from(keyPair.publicKey).toString("hex"));
console.log("📬 TON_PUBLIC_ADDRESS:", address.toString());
