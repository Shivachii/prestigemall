"use client";
import { useMapStore } from "./mapStore";

export function MapControls() {
  const scale = useMapStore((s) => s.scale);
  const setView = useMapStore((s) => s.setView);
  const reset = useMapStore((s) => s.reset);
  return <div className="map-controls" aria-label="Map controls">
    <button onClick={() => setView({ scale:Math.min(2.4, scale + .25) })} aria-label="Zoom in">+</button>
    <button onClick={() => setView({ scale:Math.max(.75, scale - .25) })} aria-label="Zoom out">−</button>
    <button className="reset" onClick={reset} aria-label="Reset map">⌖</button>
  </div>;
}

