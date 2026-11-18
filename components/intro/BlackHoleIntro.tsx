"use client";

import { ArrowRight, Orbit } from "lucide-react";
import { useState } from "react";

export function BlackHoleIntro({ onEnter, onTransitionStart, returning = false }: { onEnter: () => void; onTransitionStart?: () => void; returning?: boolean }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function enterAtlas() {
    setIsLeaving(true);
    if (onTransitionStart) onTransitionStart();
    window.setTimeout(onEnter, 2500);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  }

  return (
    <section 
      className={`black-hole-intro ${returning ? "is-returning" : ""} ${isLeaving ? "is-leaving" : ""}`} 
      aria-label={returning ? "Return through the wormhole" : "Enter Cosmyth"}
      onMouseMove={handleMouseMove}
    >
      <div className="intro-stars" aria-hidden="true" />
      <div className="black-hole-copy">
        <div className="intro-brand"><Orbit size={15} /> COSMYTH / {returning ? "00" : "01"}</div>
        <p className="intro-kicker">{returning ? "The edge between worlds" : "A living map of our cosmic neighborhood"}</p>
        <h1>{returning ? <>Find your way<br /><em>back home.</em></> : <>Fall beyond<br /><em>the familiar.</em></>}</h1>
        <p className="intro-description">{returning ? "The universe is still out there. The wormhole is the thread back to the beginning." : "There is more to space than a screen can hold. Enter Cosmyth and let gravity pull you through it."}</p>
        <button className="enter-button" onClick={enterAtlas}>{returning ? "Return to the origin" : "Enter Cosmyth"} <ArrowRight size={17} /></button>
        <span className="intro-hint">{returning ? "Cross the event horizon to leave" : "Click anywhere inside the event horizon"}</span>
      </div>
      <div 
        className="black-hole-wrapper"
        style={{ transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))` }}
      >
        <button 
          className="black-hole" 
          onClick={enterAtlas} 
          aria-label={returning ? "Return through the wormhole" : "Enter Cosmyth through the black hole"}
        >
          <span className="accretion accretion-one" /><span className="accretion accretion-two" /><span className="horizon" /><span className="singularity" />
        </button>
      </div>
      <div className="intro-coordinates">34.711° N &nbsp; / &nbsp; 18.033° E &nbsp; / &nbsp; 2026.09.16</div>
    </section>
  );
}
