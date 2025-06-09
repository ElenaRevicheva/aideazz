"use client";

console.log("✅ Providers.tsx is loaded and active");

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        activeChain="sepolia"
        clientId="816ab255dd4019069f7df4c5aafa492a"
      >
        {children}
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
