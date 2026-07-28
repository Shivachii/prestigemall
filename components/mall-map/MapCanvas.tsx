"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { mapTenants } from "@/data/tenants";
import { useMapStore } from "./mapStore";
import { TenantMarker } from "./TenantMarker";
import { NavigationPath } from "./NavigationPath";

export function MapCanvas() {
  const {floor,selectedId,scale,x,y,routeActive,select,setView} = useMapStore();
  const drag = useRef<{x:number;y:number;ox:number;oy:number}|null>(null);
  const capturedPointer = useRef<number|null>(null);
  const [dragging,setDragging] = useState(false);
  const visible = mapTenants.filter((t) => t.floor === floor);
  const selected = mapTenants.find((t) => t.id === selectedId);
  function down(e:PointerEvent<SVGSVGElement>) {
    if ((e.target as Element).closest(".tenant-marker")) return;
    drag.current={x:e.clientX,y:e.clientY,ox:x,oy:y};
    capturedPointer.current=e.pointerId;
    setDragging(true);
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e:PointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    setView({x:drag.current.ox+(e.clientX-drag.current.x),y:drag.current.oy+(e.clientY-drag.current.y)});
  }
  function endDrag(e?:PointerEvent<SVGSVGElement>){
    drag.current=null;
    setDragging(false);
    const pointerId=capturedPointer.current;
    capturedPointer.current=null;
    if (pointerId===null || !e) return;
    // Touch browsers may release capture before pointercancel reaches React.
    if (e.currentTarget.hasPointerCapture(pointerId)) {
      try { e.currentTarget.releasePointerCapture(pointerId); } catch { /* capture was already released */ }
    }
  }
  function wheel(e:WheelEvent<SVGSVGElement>){e.preventDefault();setView({scale:Math.max(.75,Math.min(2.4,scale-e.deltaY*.001))})}
  return <div className={`map-viewport ${dragging ? "dragging" : ""}`}>
      <motion.svg viewBox="0 0 1020 650" className="mall-svg" role="img" aria-label={`Interactive ${floor} floor map`}
        onPointerDown={down} onPointerMove={move} onPointerUp={endDrag} onPointerCancel={endDrag}
        onLostPointerCapture={() => endDrag()} onWheel={wheel}>
        <defs>
          <pattern id="map-grid-pattern" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#dfe1e7" strokeWidth=".7"/></pattern>
          <filter id="soft-shadow"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#28315e" floodOpacity=".12"/></filter>
        </defs>
        <AnimatePresence mode="wait">
        <motion.g key={floor} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}
          style={{transform:`translate(${x}px,${y}px) scale(${scale})`,transformOrigin:"510px 360px",transition:dragging?"none":"transform .25s ease"}}>
          <rect width="1020" height="650" fill="url(#map-grid-pattern)" />
          <path d="M105 264 L229 194 L902 282 L902 470 L778 542 L105 454 Z" fill="#dfe2e8" opacity=".8" />
          <path d="M122 250 L245 182 L885 266 L764 338 L122 250 Z" fill="#eceef2" />
          <path d="M122 250 L764 338 L764 525 L122 437 Z" fill="#f3f3f5" stroke="#c7cad2" filter="url(#soft-shadow)" />
          <path d="M764 338 L885 266 L885 452 L764 525 Z" fill="#d5d8df" stroke="#bec2cc" />
          <path d="M150 270 L745 350 L745 520 L150 439 Z" fill="#f8f8f6" stroke="#c9ccd4" />
          <path d="M165 465 L855 465" stroke="#b9bdc7" strokeWidth="2" strokeDasharray="7 8"/>
          {visible.map((tenant) => <TenantMarker key={tenant.id} tenant={tenant} selected={tenant.id===selectedId} onSelect={() => select(tenant.id)} />)}
          <NavigationPath tenant={selected} active={routeActive} />
          <text x="850" y="565" className="north-label">N</text><path d="M855 540v-32m0 0-7 12m7-12 7 12" stroke="#555d78" strokeWidth="2"/>
        </motion.g>
        </AnimatePresence>
      </motion.svg>
    <div className="map-hint">Drag to move · Scroll or pinch to zoom</div>
  </div>;
}
