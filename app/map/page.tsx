import type { Metadata } from "next";
import { MallMap } from "@/components/mall-map/MallMap";
import "./map.css";

export const metadata: Metadata = {
  title:"Interactive Mall Map | Prestige Plaza Nairobi",
  description:"Explore every floor, find stores and get indoor directions at Prestige Plaza Nairobi.",
};

type MapPageProps={searchParams:Promise<{destination?:string;route?:string}>};

export default async function MapPage({searchParams}:MapPageProps){
  const {destination,route}=await searchParams;
  return <MallMap initialDestination={destination} showRoute={route==="1"||route==="true"}/>;
}
