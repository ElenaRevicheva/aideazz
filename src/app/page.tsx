"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 flex items-center justify-center p-8 text-center">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Atuona – Web3 AI Agent</h1>
        <p className="text-lg text-gray-600">
          Your mindful Web3-native AI companion deployed on Telegram.
        </p>

        <img
          src="/atuona-avatar.png"
          alt="Atuona Avatar"
          className="w-40 h-40 mx-auto rounded-full shadow-md"
        />

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://t.me/Atuona_bot"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition"
          >
            Chat on Telegram
          </Link>

          {mounted && (
            <ConnectWallet
              theme="light"
              btnTitle="Connect Wallet"
              className="!bg-black !text-white !py-2 !px-6 !rounded-xl"
            />
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            📝 Visit the Blog
          </a>
        </div>
      </div>
    </main>
  );
}
