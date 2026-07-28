"use client";
import { create } from "zustand";
import type { FloorId } from "@/data/floors";

type MapState = {
  floor: FloorId;
  selectedId: string | null;
  scale: number;
  x: number;
  y: number;
  routeActive: boolean;
  setFloor: (floor: FloorId) => void;
  select: (id: string | null, floor?: FloorId) => void;
  setView: (view: Partial<Pick<MapState, "scale"|"x"|"y">>) => void;
  setRoute: (active: boolean) => void;
  reset: () => void;
};

export const useMapStore = create<MapState>((set) => ({
  floor:"ground", selectedId:null, scale:1, x:0, y:0, routeActive:false,
  setFloor:(floor) => set({ floor, selectedId:null, routeActive:false, scale:1, x:0, y:0 }),
  select:(selectedId, floor) => set((s) => ({ selectedId, floor:floor ?? s.floor, routeActive:false })),
  setView:(view) => set(view),
  setRoute:(routeActive) => set({ routeActive }),
  reset:() => set({ scale:1, x:0, y:0, selectedId:null, routeActive:false }),
}));

