"use client";

import Link from "next/link";
import client from "@/lib/client";
import { NETWORK } from "@/consts/contracts";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-800">
      <Link href="/" className="text-xl font-semibold text-white">
        Aideazz Marketplace
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/buy" className="text-white hover:text-blue-400">
          Buy
        </Link>
        <Link href="/sell" className="text-white hover:text-blue-400">
          Sell
        </Link>
      </div>
    </nav>
  );
}
