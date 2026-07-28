"use client";
import { useState } from "react";
import { mapTenants } from "@/data/tenants";
import { useMapStore } from "./mapStore";

export function SearchBar() {
  const [query,setQuery]=useState("");
  const select=useMapStore((s)=>s.select);
  const results=query.trim().length>1 ? mapTenants.filter((t)=>t.destination&&t.name.toLowerCase().includes(query.toLowerCase())).slice(0,6):[];
  function choose(id:string){const t=mapTenants.find((item)=>item.id===id)!;select(id,t.floor);setQuery("")}
  return <div className="map-search-wrap">
    <div className="map-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search shops, dining or amenities" aria-label="Search map locations"/>{query&&<button onClick={()=>setQuery("")}>×</button>}</div>
    {results.length>0&&<div className="map-results">{results.map((t)=><button key={t.id} onClick={()=>choose(t.id)}><span>{t.category}</span><strong>{t.name}</strong><small>{t.floor==="first"?"First Floor":t.floor==="ground"?"Ground Floor":"Parking"}</small></button>)}</div>}
  </div>
}

