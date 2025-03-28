"use client";

import "./globals.css";
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

// ✅ Manually defined Polygon chain
const polygon = {
  chainId: 137,
  name: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"],
    },
    public: {
      http: ["https://polygon-rpc.com"],
    },
  },
  blockExplorers: {
    default: { name: "Polygonscan", url: "https://polygonscan.com" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            activeChain={polygon}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}
          >
            <header className="p-4 flex justify-between items-center border-b mb-4">
              <div>
                <h1 className="text-2xl font-bold">Aideazz AI Agent Marketplace</h1>
                <a
                  href="https://t.me/Atuona_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Chat with Atuona AI Agent
                </a>
              </div>
              <ConnectWallet />
            </header>

            <div className="px-4">
              <img
                src="/az-token.png"
                alt="AZ Token"
                className="w-48 mb-6 rounded-xl shadow-lg"
              />
              {children}
            </div>
          </ThirdwebProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
