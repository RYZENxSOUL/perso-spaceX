import { SiteHeader } from "@/components/layout/SiteHeader";
import { Starfield } from "@/components/space/Starfield";
import ParticleDrift from "@/components/space/ParticleDrift";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import styles from "./theories.module.css";
import theoriesData from "../../lib/theoriesData.json";



export default function TheoriesPage() {
  return (
    <main className={styles.theoriesPage}>
      <Starfield />
      <ParticleDrift background="transparent" baseColor="#ffffff" accentColor="#6fb0d8" style={{ position: 'fixed', zIndex: 0 }} />
      <SiteHeader active="Theories" />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Knowledge / 04</p>
          <h1>Mind-Bending<br/>Theories</h1>
          <p className={styles.introCopy}>Explore the paradoxes, illusions, and terrifying possibilities that define our modern understanding of the cosmos.</p>
          <Link className="enter-button section-link" href="/"><ArrowLeft size={15} /> Return to atlas</Link>
          <div className={styles.scrollHint}><ArrowDown size={20} /></div>
        </header>

        <div className={styles.timeline}>
          {theoriesData.map((theory, index) => (
            <article key={theory.id} className={styles.theoryCard}>
              <div className={styles.theoryImageWrapper}>
                <Image src={theory.image} alt={theory.title} fill className={styles.theoryImage} />
                <div className={styles.imageOverlay} />
                <span className={styles.theoryNumber}>{(index + 1).toString().padStart(2, '0')}</span>
              </div>
              <div className={styles.theoryContent}>
                <p className={styles.categoryTag}>{theory.category}</p>
                <h2>{theory.title}</h2>
                <h4>{theory.subtitle}</h4>
                <div className={styles.theoryText}>
                  {theory.sections.map((section, idx) => (
                    <div key={idx} className={styles.theorySection}>
                      <h3>{section.heading}</h3>
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  ))}
                  {theory.link && theory.link !== "#" && (
                    <a href={theory.link} target="_blank" rel="noreferrer" className={styles.paperLink}>
                      Read More <ArrowDown size={14} style={{ transform: 'rotate(-45deg)' }}/>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
