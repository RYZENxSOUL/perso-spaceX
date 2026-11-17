import { stars } from "@/lib/planets";

export function Starfield() {
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star, index) => (
        <i key={index} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }} />
      ))}
    </div>
  );
}
