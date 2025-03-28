"use client";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Polygon } from "@thirdweb-dev/chains";

export const sdk = new ThirdwebSDK(Polygon, {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});
