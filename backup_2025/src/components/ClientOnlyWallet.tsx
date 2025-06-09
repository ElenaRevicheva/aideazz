"use client";

import { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function ClientOnlyWallet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ConnectWallet
      theme="light"
      btnTitle="Connect Wallet"
      className="!bg-black !text-white !py-2 !px-6 !rounded-xl"
    />
  );
}
