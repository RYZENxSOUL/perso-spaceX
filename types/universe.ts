export type UniverseMode = "solar" | "deep";

export type UniverseObject = {
  id: string;
  name: string;
  category: string;
  description: string;
  distance: string;
  detail: string;
  color: string;
  texture?: string;
  travelTime?: string;
  position: [number, number, number];
  radius: number;
  accent?: string;
  facts: string[];
};
