"use client";

import { useState, useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TestPage() {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain="sepolia"
        clientId="816ab255dd4019069f7df4c5aafa492a"
      >
        <main className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Standalone Wallet Test</h1>
            {mounted && (
              <ConnectWallet
                theme="light"
                btnTitle="Connect Wallet"
                className="!bg-black !text-white !py-2 !px-6 !rounded-xl"
              />
            )}
          </div>
        </main>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
