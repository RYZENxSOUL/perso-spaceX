import { ArrowLeft, ArrowUpRight, Orbit, Rocket, Telescope } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Starfield } from "@/components/space/Starfield";

const content = {
  Missions: { icon: Rocket, eyebrow: "Mission control / 02", title: "Make distance\nfeel possible.", copy: "Follow the machines and humans turning trajectories into stories. Every route begins as a line on a map.", stats: ["143 active probes", "06 crewed programs", "1,275M km tracked"] },
  Observatory: { icon: Telescope, eyebrow: "Deep field / 03", title: "Look longer.\nSee further.", copy: "A quiet room for the signals, objects, and distant light that keep changing our understanding of home.", stats: ["4,811 objects logged", "28 live surveys", "13.7B years of light"] },
};

export function SectionPage({ section }: { section: keyof typeof content }) {
  const data = content[section]; const Icon = data.icon;
  return <main className="shell section-page"><Starfield /><SiteHeader active={section} /><section className="section-hero"><div className="section-hero-copy"><p className="eyebrow"><Icon size={14} /> {data.eyebrow}</p><h1>{data.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1><p className="heading-copy">{data.copy}</p><Link className="enter-button section-link" href="/"><ArrowLeft size={15} /> Return to atlas</Link></div><div className="section-orbit"><div className="section-orbit-ring ring-a" /><div className="section-orbit-ring ring-b" /><div className="section-core"><Orbit size={30} /></div></div></section><section className="section-stats">{data.stats.map((stat, index) => <div key={stat}><span>0{index + 1}</span><strong>{stat}</strong><ArrowUpRight size={15} /></div>)}</section></main>;
}
