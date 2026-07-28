"use client";
import type { MapTenant } from "@/data/tenants";

export function NavigationPath({ tenant, active }:{tenant?:MapTenant;active:boolean}) {
  if (!tenant || !active) return null;
  const tx = tenant.x + tenant.width/2;
  const ty = tenant.y + tenant.height/2;
  const d = tenant.floor === "ground"
    ? `M 130 468 L 130 510 L 700 510 L 700 ${ty} L ${tx} ${ty}`
    : `M 800 515 L 700 515 L 700 ${ty} L ${tx} ${ty}`;
  return <g className="route-layer" aria-hidden="true">
    <path d={d} className="route-shadow" />
    <path d={d} className="route-line" />
    <circle cx={tx} cy={ty} r="7" className="route-end" />
  </g>;
}

