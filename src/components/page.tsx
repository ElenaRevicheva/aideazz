"use client";

import ListingGrid from "./ListingGrid";
import Events from "./Events";

export default function PageComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">AI Agent Marketplace</h1>
      <ListingGrid />
      <Events />
    </div>
  );
}
