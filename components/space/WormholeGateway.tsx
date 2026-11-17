"use client";

import { ArrowLeft, Orbit } from "lucide-react";

export function WormholeGateway({ onReturn }: { onReturn: () => void }) {
  return (
    <button className="wormhole-gateway" onClick={onReturn} aria-label="Return to the wormhole">
      <span className="gateway-core"><Orbit size={14} /></span>
      <span><strong>Return to wormhole</strong><small>Back to the origin</small></span>
      <ArrowLeft size={14} />
    </button>
  );
}
