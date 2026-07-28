"use client";
import { useEffect } from "react";
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
import { mapTenants } from "@/data/tenants";

export function MallMap({ initialDestination, showRoute = false }:{initialDestination?:string;showRoute?:boolean}) {
  const floor = useMapStore((s) => s.floor);
  const select = useMapStore((s) => s.select);
  const setRoute = useMapStore((s) => s.setRoute);
  const setView = useMapStore((s) => s.setView);
  const detail = floors.find((f) => f.id === floor)!;
  useEffect(() => {
    if (!initialDestination) return;
    const destination=mapTenants.find((tenant)=>tenant.id===initialDestination);
    if (!destination) return;
    select(destination.id,destination.floor);
    setView({scale:1.2,x:0,y:0});
    if (showRoute) setRoute(true);
  },[initialDestination,select,setRoute,setView,showRoute]);
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
