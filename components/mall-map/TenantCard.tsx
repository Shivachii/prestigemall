"use client";
import Link from "next/link";
import { mapTenants } from "@/data/tenants";
import { useMapStore } from "./mapStore";
import { ArrowRight, ArrowUpRight } from "@/app/components/icons";

const storeProfiles: Record<string, string> = {
  naivas:"naivas", "java-house":"java-house", "daily-cafe":"the-daily-cafe-and-bistro",
  bata:"bata", "american-tourister":"american-tourister", airtel:"airtel",
  "touch-de-rose":"touch-de-rose", ozana:"ozana-beauty", cinema:"prestige-cinema",
  playza:"playza", beerbirds:"beerbirds", "food-patio":"food-patio",
  "home-beyond":"home-and-beyond", safaricom:"safaricom", "urban-hair":"urban-hair-studio",
};

export function TenantCard() {
  const id=useMapStore((s)=>s.selectedId); const route=useMapStore((s)=>s.routeActive);
  const setRoute=useMapStore((s)=>s.setRoute); const select=useMapStore((s)=>s.select);
  const t=mapTenants.find((item)=>item.id===id);
  if(!t) return <aside className="tenant-panel empty"><span className="panel-index">PRESTIGE PLAZA</span><h2>Find your way,<br/><em>effortlessly.</em></h2><p>Search for a destination or select any location on the map to see details and directions.</p><div className="panel-key"><i/>Shopping <i/>Dining <i/>Entertainment</div></aside>;
  return <aside className={`tenant-panel ${route ? "route-view" : ""}`}>
    <button className="panel-close" onClick={()=>select(null)} aria-label="Close details">×</button>
    <span className="panel-index">{t.category} · {t.floor==="first"?"LEVEL 01":t.floor==="ground"?"GROUND":"PARKING"}</span>
    <h2>{t.name}</h2><p>{t.description}</p>
    <dl>{t.hours&&<div><dt>Opening hours</dt><dd>{t.hours}</dd></div>}{t.phone&&<div><dt>Phone</dt><dd>{t.phone}</dd></div>}<div><dt>Location</dt><dd>{t.floor==="first"?"First Floor":t.floor==="ground"?"Ground Floor":"Parking Level"}</dd></div></dl>
    <button className={`route-button ${route?"active":""}`} onClick={()=>setRoute(!route)}>{route?"Hide route":"Directions from entrance"} <ArrowRight size={15}/></button>
    {t.website&&<a className="tenant-web" href={t.website} target="_blank" rel="noreferrer">{t.cta??"Visit website"} <ArrowUpRight size={13}/></a>}
    {storeProfiles[t.id]&&<Link className="tenant-profile" href={`/stores/${storeProfiles[t.id]}`}>View store profile <ArrowRight size={12}/></Link>}
    {route&&<div className="route-summary"><span>Estimated walk</span><strong>{t.floor==="ground"?"2–4 min":"4–6 min"} · {t.floor==="ground"?"120":"210"} m</strong><small>Main entrance / {t.floor==="first"?"Lift / ":""}{t.name}</small></div>}
  </aside>;
}
