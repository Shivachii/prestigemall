import type { Metadata } from "next";
import { MallMap } from "@/components/mall-map/MallMap";
import "./map.css";

export const metadata: Metadata = {
  title:"Interactive Mall Map | Prestige Plaza Nairobi",
  description:"Explore every floor, find stores and get indoor directions at Prestige Plaza Nairobi.",
};

export default function MapPage(){return <MallMap/>}

