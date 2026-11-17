"use client";

import { ArrowUpRight, Gauge, Layers3, Moon, Rocket } from "lucide-react";
import type { Planet } from "@/types/space";

type PlanetInspectorProps = { planet: Planet; speed: number; onSpeedChange: (speed: number) => void; onPlotRoute: () => void };

export function PlanetInspector({ planet, speed, onSpeedChange, onPlotRoute }: PlanetInspectorProps) {
  const travelTime = useTravelTime(planet.distance, speed);
  return (
    <aside className="inspector">
      <div className="inspector-top"><span className="rail-label">Selected body</span><button className="icon-button" aria-label="Layers"><Layers3 size={17} /></button></div>
      <div className="planet-heading"><div className="planet-thumb" style={{ background: planet.color }}><span /></div><div><h2>{planet.name}</h2><p>{planet.type}</p></div></div>
      <p className="planet-description">{planet.description}</p>
      <div className="stat-grid"><div><span>Distance from Earth</span><strong>{planet.distance === 0 ? "Local orbit" : `${planet.distance.toLocaleString()}M km`}</strong></div><div><span>Equatorial radius</span><strong>{planet.radius}</strong></div><div><span>Length of day</span><strong>{planet.day}</strong></div><div><span>Orbital period</span><strong>{planet.year}</strong></div></div>
      <div className="route-card"><div className="route-card-header"><span><Rocket size={15} /> Route estimate</span><span className="live-tag">LIVE</span></div><div className="route-points"><span>EARTH</span><div><i /><i /><i /></div><span>{planet.name.toUpperCase()}</span></div><div className="eta"><div><span>Arrival in</span><strong>{travelTime}</strong></div><div><span>At cruise speed</span><strong>{speed} km/s</strong></div></div><label className="speed-control"><span><Gauge size={14} /> Adjust speed</span><strong>{speed} km/s</strong><input type="range" min="8" max="62" value={speed} onChange={(event) => onSpeedChange(Number(event.target.value))} aria-label={`Adjust speed ${speed} km/s`} /></label><button className="plot-button" onClick={onPlotRoute}>Plot this route <ArrowUpRight size={15} /></button></div>
      <button className="details-button">Open body details <ArrowUpRight size={15} /></button><div className="inspector-note"><Moon size={15} /><span>Distances are calculated from current average orbital positions.</span></div>
    </aside>
  );
}

function useTravelTime(distance: number, speed: number) {
  if (distance === 0) return "Already here";
  const days = Math.max(2, Math.round((distance * 1_000_000) / (speed * 86_400)));
  return days > 365 ? `${(days / 365).toFixed(1)} years` : `${days} days`;
}
