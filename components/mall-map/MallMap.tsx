"use client";
import Link from "next/link";
import Image from "next/image";
import { FloorSelector } from "./FloorSelector";
import { MapCanvas } from "./MapCanvas";
import { MapControls } from "./MapControls";
import { SearchBar } from "./SearchBar";
import { TenantCard } from "./TenantCard";
import { floors } from "@/data/floors";
import { useMapStore } from "./mapStore";
import { ArrowUpRight } from "@/app/components/icons";

export function MallMap() {
  const floor = useMapStore((s) => s.floor);
  const detail = floors.find((f) => f.id === floor)!;
  return (
    <main className="map-page">
      <header className="map-header">
        <Link href="/" className="map-logo">
          <Image
            src="/logos/prestige-logo-nobg.png"
            width={1536}
            height={1024}
            alt="Prestige Plaza"
          />
        </Link>
        <div>
          <span>Interactive directory</span>
          <strong>Explore the plaza</strong>
        </div>
      <Link href="/visit" className="map-visit">
        Plan your visit <ArrowUpRight size={13}/>
      </Link>
      </header>
      <section className="map-toolbar">
        <SearchBar />
        <FloorSelector />
      </section>
      <section className="map-workspace">
        <div className="map-stage">
          <div className="floor-title">
            <span>LEVEL {detail.level}</span>
            <h1>{detail.name}</h1>
            <p>{detail.description}</p>
          </div>
          <MapCanvas />
          <MapControls />
        </div>
        <TenantCard />
      </section>
    </main>
  );
}
