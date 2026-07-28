export type FloorId = "parking" | "ground" | "first";

export type MallFloor = {
  id: FloorId;
  shortName: string;
  name: string;
  level: string;
  description: string;
};

export const floors: MallFloor[] = [
  { id: "parking", shortName: "Parking", name: "Parking", level: "P", description: "Parking zones, vehicle access and the lift lobby." },
  { id: "ground", shortName: "Ground", name: "Ground Floor", level: "G", description: "Everyday shopping, cafés and the main entrances." },
  { id: "first", shortName: "First", name: "First Floor", level: "01", description: "Dining, cinema, entertainment and lifestyle stores." },
];

