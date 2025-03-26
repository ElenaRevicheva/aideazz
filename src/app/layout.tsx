import "./globals.css";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { polygon } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aideazz AI Marketplace",
  description: "Decentralized marketplace for AI agents and NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider activeChain={polygon}>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
