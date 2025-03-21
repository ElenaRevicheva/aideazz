"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-black via-gray-900 to-black">
      
      {/* Hero Image (Now Scaled Properly to Fit Without Scrolling) */}
      <div className="relative w-full flex justify-center mb-6">
        <Image
          src="/hero-asset.png"
          width={800}  // Adjusted width
          height={450} // Reduced height to fit screen
          alt="Hero asset"
          quality={100}
          className="max-w-screen-md h-auto object-contain rounded-lg"
        />
      </div>

      {/* Showroom Content */}
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to the Atuona AI Agent Showroom
      </h1>
      <p className="text-white/70 text-lg max-w-2xl mb-6">
        Meet our first AI agent — <strong>@Atuona_bot</strong>. Designed to guide
        you through mindful digital creativity and Web3 experiences.
      </p>
      <Link
        href="https://t.me/Atuona_bot"
        target="_blank"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
      >
        ✨ Try Atuona on Telegram
      </Link>
    </div>
  );
}
