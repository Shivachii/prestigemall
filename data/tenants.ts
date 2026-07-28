import type { FloorId } from "./floors";

export type MapCategory = "Shopping" | "Dining" | "Entertainment" | "Services" | "Amenities" | "Parking";

export type MapTenant = {
  id: string;
  name: string;
  category: MapCategory;
  floor: FloorId;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  hours?: string;
  phone?: string;
  website?: string;
  cta?: string;
  destination?: boolean;
};

export const mapTenants: MapTenant[] = [
  { id:"main-entrance", name:"Main Entrance", category:"Amenities", floor:"ground", x:78,y:412,width:105,height:58,description:"Main pedestrian entrance from Ngong Road.",hours:"Open daily",destination:true },
  { id:"naivas", name:"Naivas", category:"Shopping", floor:"ground", x:192,y:286,width:190,height:118,description:"Fresh food, groceries and everyday essentials.",hours:"7:00 AM – 10:00 PM",phone:"+254 111 184 200",destination:true },
  { id:"java-house", name:"Java House", category:"Dining", floor:"ground", x:393,y:286,width:112,height:82,description:"Kenyan coffee, breakfast and relaxed all-day dining.",hours:"7:00 AM – 10:00 PM",website:"https://javahouseafrica.com",cta:"View menu",destination:true },
  { id:"daily-cafe", name:"The Daily Café", category:"Dining", floor:"ground", x:514,y:286,width:112,height:82,description:"Coffee, casual plates and easy bistro dining.",hours:"8:00 AM – 9:00 PM",destination:true },
  { id:"bata", name:"Bata", category:"Shopping", floor:"ground", x:393,y:378,width:110,height:78,description:"Footwear and accessories for the whole family.",hours:"9:00 AM – 8:00 PM",destination:true },
  { id:"american-tourister", name:"American Tourister", category:"Shopping", floor:"ground", x:513,y:378,width:113,height:78,description:"Luggage and travel essentials.",hours:"9:00 AM – 8:00 PM",destination:true },
  { id:"airtel", name:"Airtel", category:"Services", floor:"ground", x:637,y:286,width:102,height:80,description:"Devices, connectivity and customer support.",hours:"9:00 AM – 7:00 PM",destination:true },
  { id:"touch-de-rose", name:"Touch de Rose", category:"Services", floor:"ground", x:637,y:376,width:102,height:80,description:"Professional laundry and garment care.",hours:"8:00 AM – 8:00 PM",phone:"+254 700 000 000",destination:true },
  { id:"ozana", name:"Ozana Beauty", category:"Shopping", floor:"ground", x:749,y:286,width:100,height:80,description:"Beauty, makeup and personal care essentials.",hours:"9:00 AM – 8:00 PM",destination:true },
  { id:"washrooms-g", name:"Washrooms", category:"Amenities", floor:"ground", x:749,y:376,width:100,height:80,description:"Accessible public washrooms.",destination:true },
  { id:"lift-g", name:"Lift Lobby", category:"Amenities", floor:"ground", x:756,y:472,width:88,height:56,description:"Lifts connecting all mall levels.",destination:true },
  { id:"cinema", name:"Prestige Cinema", category:"Entertainment", floor:"first", x:190,y:282,width:255,height:126,description:"The latest films and big-screen moments in the heart of Nairobi.",hours:"10:00 AM – Midnight",phone:"+254 706 777 303",website:"https://prestigecinema.vercel.app",cta:"Book tickets",destination:true },
  { id:"playza", name:"Playza Entertainment", category:"Entertainment", floor:"first", x:456,y:282,width:190,height:126,description:"Bowling, arcade, mini golf and immersive family play.",hours:"10:00 AM – 10:00 PM",phone:"+254 706 288 120",destination:true },
  { id:"beerbirds", name:"Beerbirds", category:"Dining", floor:"first", x:657,y:282,width:190,height:82,description:"Live sport, crowd-pleasing plates and cold drinks.",hours:"11:00 AM – Late",destination:true },
  { id:"food-patio", name:"Food Patio", category:"Dining", floor:"first", x:657,y:374,width:190,height:82,description:"Continental favourites in a relaxed setting.",hours:"9:00 AM – 10:00 PM",destination:true },
  { id:"home-beyond", name:"Home & Beyond", category:"Shopping", floor:"first", x:190,y:419,width:145,height:80,description:"Furniture, décor and practical pieces for every room.",hours:"9:00 AM – 8:00 PM",destination:true },
  { id:"safaricom", name:"Safaricom", category:"Services", floor:"first", x:346,y:419,width:120,height:80,description:"Devices, connectivity and customer care.",hours:"9:00 AM – 7:00 PM",destination:true },
  { id:"urban-hair", name:"Urban Hair Studio", category:"Services", floor:"first", x:477,y:419,width:126,height:80,description:"Full-service styling, colour and natural hair care.",hours:"9:00 AM – 8:00 PM",destination:true },
  { id:"lift-f", name:"Lift Lobby", category:"Amenities", floor:"first", x:756,y:472,width:88,height:56,description:"Lifts connecting all mall levels.",destination:true },
  { id:"zone-a", name:"Parking Zone A", category:"Parking", floor:"parking", x:180,y:285,width:210,height:165,description:"Covered parking near the lift lobby.",hours:"Open 24 hours",destination:true },
  { id:"zone-b", name:"Parking Zone B", category:"Parking", floor:"parking", x:402,y:285,width:210,height:165,description:"Covered visitor parking.",hours:"Open 24 hours",destination:true },
  { id:"zone-c", name:"Parking Zone C", category:"Parking", floor:"parking", x:624,y:285,width:210,height:165,description:"Parking close to the vehicle exit.",hours:"Open 24 hours",destination:true },
  { id:"parking-entry", name:"Parking Entrance", category:"Parking", floor:"parking", x:76,y:413,width:92,height:58,description:"Vehicle entrance from Ngong Road.",destination:true },
  { id:"parking-exit", name:"Parking Exit", category:"Parking", floor:"parking", x:846,y:413,width:92,height:58,description:"Vehicle exit to Ngong Road.",destination:true },
  { id:"lift-p", name:"Lift Lobby", category:"Amenities", floor:"parking", x:466,y:470,width:95,height:60,description:"Lift and stair access to the mall.",destination:true },
];

export const categoryColors: Record<MapCategory, string> = {
  Shopping:"#6571a9", Dining:"#bf7650", Entertainment:"#996f9d",
  Services:"#4e8f8b", Amenities:"#66727b", Parking:"#7b8794",
};

export const mapDestinationByStoreSlug: Record<string, string> = {
  naivas:"naivas", "java-house":"java-house", "the-daily-cafe-and-bistro":"daily-cafe",
  bata:"bata", "american-tourister":"american-tourister", airtel:"airtel",
  "touch-de-rose":"touch-de-rose", "ozana-beauty":"ozana",
  "prestige-cinema":"cinema", playza:"playza", beerbirds:"beerbirds",
  "food-patio":"food-patio", "home-and-beyond":"home-beyond",
  safaricom:"safaricom", "urban-hair-studio":"urban-hair",
};
