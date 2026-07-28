"use client";
import { floors } from "@/data/floors";
import { useMapStore } from "./mapStore";

export function FloorSelector() {
  const floor = useMapStore((s) => s.floor);
  const setFloor = useMapStore((s) => s.setFloor);
  return <div className="floor-selector" aria-label="Choose a floor">
    {floors.map((item) => <button key={item.id} className={floor === item.id ? "active" : ""} onClick={() => setFloor(item.id)}>
      <span>{item.level}</span><strong>{item.shortName}</strong>
    </button>)}
  </div>;
}

