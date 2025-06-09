import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-3xl bg-white text-black rounded-2xl shadow-md p-8 border border-gray-300">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">
          🎓 Meet EspaLuz — First Graduate of the Aideazz AI Ecosystem
        </h1>

        <p className="mb-4 text-lg">
          <strong>Aideazz</strong> is a decentralized ecosystem of emotionally intelligent AI agents — built to help real families adapt, learn, and thrive through human-centered technology.
        </p>

        <p className="mb-4 text-lg">
          <strong>EspaLuz</strong> is our first public graduate — a bilingual AI tutor designed for expat families. She speaks Spanish and English, understands emotions, and supports daily learning through voice, video, and photo translation.
        </p>

        <p className="mb-6 text-lg">
          Created by <strong>Elena Revicheva</strong> in Panama, EspaLuz is now live on Telegram, with WhatsApp integration coming soon.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <a
            href="https://t.me/EspaLuzFamily_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            💬 Chat with EspaLuz on Telegram
          </a>
          <div className="text-gray-500 text-sm text-center md:text-left">
            Or connect your wallet below to explore more.
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <ConnectWallet />
        </div>

        <hr className="border-t border-gray-300 mb-6" />

        <h2 className="text-xl font-semibold text-center mb-2 text-indigo-600">
          🌱 Explore Our Ecosystem (MVP)
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          These early components are under development and already serving real users.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <a
            href="/blog"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📚 Visit Our Blog
          </a>
          <a
            href="/agents"
            className="text-blue-600 underline hover:text-blue-800"
          >
            🖼️ View AI Agent Gallery (NFT Marketplace MVP)
          </a>
        </div>
      </div>
    </main>
  );
}
