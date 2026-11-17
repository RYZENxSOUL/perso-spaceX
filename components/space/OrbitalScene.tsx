"use client";

import { Compass, Orbit, Waypoints } from "lucide-react";
import { useState } from "react";
import type { Planet } from "@/types/space";

type OrbitalSceneProps = {
  planets: Planet[];
  selectedName: string;
  selectedDistance: number;
  onSelect: (name: string) => void;
  mapMode: "orbit" | "route";
  onMapModeChange: (mode: "orbit" | "route") => void;
  isAutopilot: boolean;
  onAutopilotChange: () => void;
};

export function OrbitalScene({ planets, selectedName, selectedDistance, onSelect, mapMode, onMapModeChange, isAutopilot, onAutopilotChange }: OrbitalSceneProps) {
  const [sceneStyle, setSceneStyle] = useState({ "--scene-x": "0deg", "--scene-y": "0deg" } as React.CSSProperties);

  function tiltScene(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    setSceneStyle({ "--scene-x": `${x}deg`, "--scene-y": `${y}deg` } as React.CSSProperties);
  }

  return (
    <div className="viewport-column">
      <div className="scene-toolbar">
        <div className="view-tabs">
          <button className={mapMode === "orbit" ? "selected" : ""} onClick={() => onMapModeChange("orbit")}><Orbit size={14} /> Orbital view</button>
          <button className={mapMode === "route" ? "selected" : ""} onClick={() => onMapModeChange("route")}><Waypoints size={14} /> Route view</button>
        </div>
        <button className="compass-button"><Compass size={16} /> N 12°</button>
      </div>
      <div className={`space-scene ${mapMode === "route" ? "route-mode" : ""}`} onPointerMove={tiltScene} style={sceneStyle}>
        <div className="scene-depth-grid" />
        <div className="scene-caption"><span>Sol system</span><small>1 : 8.2 billion scale</small></div>
        <div className="scene-coordinate">X 04.772 &nbsp; / &nbsp; Y 18.029</div>
        <div className="sun-glow" /><div className="sun"><span /></div>
        {planets.map((planet) => (
          <button key={planet.name} className={`orbit-ring orbit-${planet.name.toLowerCase()} ${selectedName === planet.name ? "focused" : ""}`} style={{ width: `${planet.orbit * 2.1}%`, height: `${planet.orbit * 2.1}%` }} onClick={() => onSelect(planet.name)} aria-label={`Select ${planet.name}`}>
            <span className="planet" style={{ width: planet.size, height: planet.size, background: planet.color, boxShadow: `0 0 18px ${planet.accent}55` }}>{planet.name === "Saturn" && <i />}</span>
            <span className="planet-label">{planet.name}</span>
          </button>
        ))}
        {mapMode === "route" && selectedDistance > 0 && <div className="route-line" />}
        <div className="scene-legend"><span><i className="legend-home" /> Earth</span><span><i className="legend-target" /> {selectedName}</span><span><i className="legend-route" /> route preview</span></div>
      </div>
      <div className="scene-footer">
        <div className="timeline-label"><span>TIME SIMULATION</span><strong>Now</strong><small>+ 2.4 months</small></div>
        <input className="timeline" type="range" min="0" max="100" defaultValue="18" aria-label="Time simulation" />
        <div className="playback"><button aria-label="Play simulation">▶</button><button className={isAutopilot ? "on" : ""} onClick={onAutopilotChange}><span /> Autopilot</button></div>
      </div>
    </div>
  );
}
