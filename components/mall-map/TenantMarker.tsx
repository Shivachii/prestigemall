"use client";
import type { MapTenant } from "@/data/tenants";
import { categoryColors } from "@/data/tenants";

export function TenantMarker({ tenant, selected, onSelect }:{tenant:MapTenant;selected:boolean;onSelect:()=>void}) {
  const compact = tenant.width < 115;
  return <g id={tenant.id} className={`tenant-marker ${selected ? "selected" : ""}`} role="button" tabIndex={0}
    aria-label={`${tenant.name}, ${tenant.category}`} onClick={onSelect} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}>
    <rect x={tenant.x} y={tenant.y+10} width={tenant.width} height={tenant.height} rx="5" fill="#b5b5bc" opacity=".35" />
    <rect className="tenant-block" x={tenant.x} y={tenant.y} width={tenant.width} height={tenant.height} rx="5" fill={selected ? categoryColors[tenant.category] : "#fcfcfa"} stroke={selected ? categoryColors[tenant.category] : "#cfd0d5"} />
    <rect x={tenant.x} y={tenant.y} width="5" height={tenant.height} rx="2" fill={categoryColors[tenant.category]} />
    <text className="tenant-label" x={tenant.x + tenant.width/2 + 2} y={tenant.y + tenant.height/2 - (compact ? 2 : 5)} textAnchor="middle" fill={selected ? "#fff" : "#272b3b"}>
      {tenant.name.length > 19 ? <><tspan x={tenant.x + tenant.width/2 + 2} dy="-4">{tenant.name.split(" ").slice(0,-1).join(" ")}</tspan><tspan x={tenant.x + tenant.width/2 + 2} dy="15">{tenant.name.split(" ").slice(-1)}</tspan></> : tenant.name}
    </text>
    {!compact && <text className="tenant-category" x={tenant.x + tenant.width/2 + 2} y={tenant.y + tenant.height/2 + 14} textAnchor="middle" fill={selected ? "#fff" : "#888b95"}>{tenant.category}</text>}
  </g>;
}

