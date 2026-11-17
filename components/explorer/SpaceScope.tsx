"use client";

import { Compass, Crosshair, Info, Layers3, List, Maximize, Orbit, Pause, Play, Search, Sparkles, Telescope, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlackHoleIntro } from "@/components/intro/BlackHoleIntro";
import Link from "next/link";
import { deepObjects, solarObjects } from "@/lib/universe";
import type { UniverseMode, UniverseObject } from "@/types/universe";
import { UniverseCanvas } from "@/components/space/UniverseCanvas";
import { WormholeGateway } from "@/components/space/WormholeGateway";

export function SpaceScope() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const modeParam = searchParams.get("mode") as UniverseMode;
  const targetParam = searchParams.get("target");

  const mode = modeParam === "deep" ? "deep" : "solar";
  const selectedId = targetParam || "";

  const [query, setQuery] = useState("");
  const [tourOpen, setTourOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [zoomSignal, setZoomSignal] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [time, setTime] = useState(22);
  const [showIntro, setShowIntro] = useState(true);
  const [returning, setReturning] = useState(false);
  const objects = mode === "solar" ? solarObjects : deepObjects;
  const selected = objects.find((object) => object.id === selectedId);
  const filtered = useMemo(() => objects.filter((object) => `${object.name} ${object.category}`.toLowerCase().includes(query.toLowerCase())), [objects, query]);

  useEffect(() => {
    if (window.localStorage.getItem("orbital-atlas-entered") === "true") setShowIntro(false);
  }, []);

  function switchMode(nextMode: UniverseMode) {
    router.push(`${pathname}?mode=${nextMode}`);
    setTourOpen(false); setQuery("");
  }
  function handleSelect(id: string) {
    router.push(`${pathname}?mode=${mode}&target=${id}`);
    setTourOpen(false);
  }
  function clearSelect() {
    router.push(`${pathname}?mode=${mode}`);
  }

  function enterAtlas() { window.localStorage.setItem("orbital-atlas-entered", "true"); setShowIntro(false); }
  function returnToOrigin() {
    setReturning(true);
    window.setTimeout(() => {
      window.localStorage.removeItem("orbital-atlas-entered");
      setShowIntro(true);
      setReturning(false);
      clearSelect();
    }, 850);
  }

  return <>{showIntro && <BlackHoleIntro onEnter={enterAtlas} returning={returning} />}<main className={`scope-shell ${showIntro ? "scope-locked" : "scope-awake"} ${returning ? "scope-exiting" : ""}`}>
    <div className="scope-stage"><UniverseCanvas mode={mode} objects={objects} selectedId={selectedId} onSelect={(object) => handleSelect(object.id)} zoomSignal={zoomSignal} resetSignal={resetSignal} /></div>
    <header className="scope-header"><button className="scope-logo" onClick={returnToOrigin} aria-label="Return to Orbital Atlas origin"><span><Sparkles size={15} /></span><strong>ORBITAL<br /><em>ATLAS</em></strong></button><div className="scope-mode"><button className={mode === "solar" ? "active" : ""} onClick={() => switchMode("solar")}>Solar system</button><button className={mode === "deep" ? "active" : ""} onClick={() => switchMode("deep")}>Deep universe</button></div><div className="scope-header-actions"><button className="return-link" onClick={returnToOrigin} aria-label="Return to wormhole"><Orbit size={15} /> <span>Wormhole</span></button><button aria-label="Toggle fullscreen" onClick={() => document.documentElement.requestFullscreen?.()}><Maximize size={17} /></button><button className="scope-live"><i /> Live model</button></div></header>
    <aside className="scope-left-rail">
      <button className="scope-tool active" aria-label="Explore" title="Explore" onClick={() => setTourOpen(true)}><Compass size={18} /></button>
      <button className="scope-tool" aria-label="Object layers" title="Object layers" onClick={() => setTourOpen(true)}><Layers3 size={18} /></button>
      <button className="scope-tool" aria-label="Guided tours" title="Guided tours" onClick={() => setTourOpen(!tourOpen)}><List size={18} /></button>
      <span />
      <Link href="/observatory" className="scope-tool" aria-label="Observatory" title="Observatory"><Telescope size={18} /></Link>
      <Link href="/missions" className="scope-tool" aria-label="Missions" title="Missions"><Info size={18} /></Link>
    </aside>
    <div className="scope-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the universe" aria-label="Search the universe" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>} {query && <div className="search-results">{filtered.map((object) => <button key={object.id} onClick={() => { handleSelect(object.id); setQuery(""); }}>{object.name}<small>{object.category}</small></button>)}</div>}</div>
    {tourOpen && <aside className="tour-panel"><div className="panel-heading"><div><span>Interactive atlas / {mode === "solar" ? "01" : "04"}</span><h1>{mode === "solar" ? "Solar system" : "Deep universe"}</h1></div><button onClick={() => setTourOpen(false)} aria-label="Close tour panel"><X size={16} /></button></div><p className="panel-intro">{mode === "solar" ? "Drag to orbit. Scroll to travel. Select a world to bring it closer." : "A field guide to the objects that make the dark feel alive."}</p><div className="tour-list">{objects.map((object, index) => <button key={object.id} className={selectedId === object.id ? "selected" : ""} onClick={() => handleSelect(object.id)}><span className="tour-index">0{index + 1}</span><span className="tour-object"><i style={{ background: object.color }} />{object.name}<small>{object.category} · {object.distance}</small></span><span className="tour-arrow">↗</span></button>)}</div></aside>}
    {selected && <aside className="object-card"><div className="object-card-top"><span>{selected.category}</span><button aria-label="Close information" onClick={clearSelect}><X size={14} /></button></div><div className="object-title"><i style={{ background: selected.color, boxShadow: `0 0 28px ${selected.color}` }} /><div><h2>{selected.name}</h2><span>{selected.detail}</span></div></div><p>{selected.description}</p><div className="object-facts">{selected.facts.map((fact) => <span key={fact}>{fact}</span>)}</div><div className="object-distance"><span>Distance from Earth</span><strong>{selected.distance}</strong></div>{selected.travelTime && <div className="object-distance"><span>Travel Time (Light Speed)</span><strong>{selected.travelTime}</strong></div>}<button className="focus-object" onClick={() => setTourOpen(false)}><Crosshair size={14} /> Focus object</button></aside>}
    {!selected && !tourOpen && <div className="discover-hint"><span>01</span><strong>Choose a world to begin</strong><small>Drag with your touchpad to look · scroll to travel · click any glowing object</small></div>}
    {!showIntro && <WormholeGateway onReturn={returnToOrigin} />}
    <div className="scope-controls"><button aria-label="Zoom out" onClick={() => setZoomSignal(-zoomSignal - 1)}><ZoomOut size={16} /></button><button aria-label="Reset view" onClick={() => setResetSignal(resetSignal + 1)}><Crosshair size={16} /></button><button aria-label="Zoom in" onClick={() => setZoomSignal(zoomSignal + 1)}><ZoomIn size={16} /></button></div>
    <footer className="scope-footer"><div className="time-control"><span>TIME</span><strong>2026.09.16</strong><input type="range" min="0" max="100" value={time} onChange={(event) => setTime(Number(event.target.value))} aria-label="Time control" /><button onClick={() => setPaused(!paused)} aria-label={paused ? "Play simulation" : "Pause simulation"}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div><div className="scope-hint"><span>+</span> Drag to explore <span>+</span> Click an object to inspect</div><div className="scope-coordinates">{mode === "solar" ? "SOL / 04.772 / 18.029" : "MILKY WAY / 00.144 / 42.891"}</div></footer>
  </main></>;
}
