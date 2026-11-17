import type { Planet, Star } from "@/types/space";

export const planets: Planet[] = [
  { name: "Mercury", type: "Terrestrial planet", distance: 91.7, radius: "2,440 km", day: "58.6 days", year: "88 days", color: "#c98458", size: 16, orbit: 11, accent: "#f4b17f", description: "A world of extreme contrasts, racing closest to the Sun." },
  { name: "Venus", type: "Terrestrial planet", distance: 41.4, radius: "6,052 km", day: "243 days", year: "225 days", color: "#d8a665", size: 23, orbit: 16, accent: "#ffd58a", description: "Cloud-wrapped and bright, Venus is Earth's incandescent twin." },
  { name: "Earth", type: "Home planet", distance: 0, radius: "6,371 km", day: "23.9 hours", year: "365 days", color: "#4f8fa8", size: 26, orbit: 21, accent: "#82dbdd", description: "Our blue marble, the only known world with life." },
  { name: "Mars", type: "Terrestrial planet", distance: 225, radius: "3,390 km", day: "24.6 hours", year: "687 days", color: "#b9573c", size: 20, orbit: 27, accent: "#ff805d", description: "The red planet keeps the next horizon just within reach." },
  { name: "Jupiter", type: "Gas giant", distance: 628.7, radius: "69,911 km", day: "9.9 hours", year: "11.9 years", color: "#c48b69", size: 43, orbit: 34, accent: "#e9c89a", description: "A stormy giant with a gravity well of its own." },
  { name: "Saturn", type: "Gas giant", distance: 1_275, radius: "58,232 km", day: "10.7 hours", year: "29.5 years", color: "#c6a879", size: 38, orbit: 41, accent: "#efcf98", description: "A ringed world made of ice, dust, and impossible geometry." },
];

export const stars: Star[] = Array.from({ length: 75 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: `${(index % 3) + 1}px`,
  delay: `${(index % 7) * 0.6}s`,
}));

export function formatDistance(distance: number) {
  return distance === 0 ? "Local orbit" : `${distance.toLocaleString()}M km`;
}
