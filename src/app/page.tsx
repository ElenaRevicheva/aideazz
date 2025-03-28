"use client";

import React from "react";
import { NFTGrid } from "@/components/NFTGrid";
import Link from "next/link";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Aideazz AI Agent Marketplace</h1>
        <ConnectWallet />
      </div>

      <div className="mb-6">
        <Link
          href="https://t.me/Atuona_bot"
          target="_blank"
          className="text-blue-600 underline text-lg"
        >
          Chat with our first AI Agent: Atuona 🤖
        </Link>
      </div>

      <div className="mb-8">
        <Image
          src="/az-token.png"
          alt="AZ Token"
          width={300}
          height={300}
          className="rounded-xl shadow-md"
        />
        <p className="text-sm text-gray-600 mt-2">AZ Token — The Heart of Aideazz</p>
      </div>

      <NFTGrid />
    </main>
  );
}
