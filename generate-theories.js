const fs = require('fs');

const theories = [
  // COSMOLOGY
  {
    id: "no-before",
    title: "The Standard Answer: No 'Before'",
    subtitle: "The Boundaries of Time",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/abstract%20time%20fabric%20universe%20origin%20dark%20void%20cinematic?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Big_Bang",
    sections: [
      {
        heading: "The Mainstream Position",
        paragraphs: [
          "Under general relativity, time itself is part of what the Big Bang created. The very fabric of spacetime unfurled from that initial singularity.",
          "Asking what came before the Big Bang is, mathematically speaking, a flawed question. It is often compared to asking what lies north of the North Pole. The concept of 'before' requires time to exist, but time had not yet begun. This conclusion forces us to accept that the universe has a definitive starting line, beyond which causality itself breaks down.",
          "While this is the standard cosmological model taught in textbooks, it remains deeply unsatisfying to human intuition, which expects every effect to have a cause."
        ]
      }
    ]
  },
  {
    id: "big-bounce",
    title: "The Big Bounce",
    subtitle: "The Cyclic Universe",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/universe%20collapsing%20and%20exploding%20big%20bounce%20cosmic%20cycle%208k?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1412.2914",
    sections: [
      {
        heading: "A Universe on Repeat",
        paragraphs: [
          "Maybe our universe is merely the rebound of a previous one that collapsed in on itself under its own gravity. In this cyclic model, the cosmos breathes—expanding outwards before eventually succumbing to gravity, collapsing into a 'Big Crunch', and immediately rebounding in a new 'Big Bang'.",
          "This theory suggests we are not the first universe, nor will we be the last. More radically, the fundamental 'constants' of physics might reset with every bounce.",
          "This means that in previous iterations, gravity might have been stronger, light might have moved slower, and entirely different forms of matter could have existed. The Big Bounce eleganty dodges the question of an absolute beginning by proposing an eternal cycle of rebirth."
        ]
      }
    ]
  },
  {
    id: "eternal-inflation",
    title: "Eternal Inflation",
    subtitle: "The Multiverse Bubble",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/multiverse%20bubbles%20expanding%20in%20a%20vast%20cosmic%20void%20fractal%20space?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/hep-th/0612137",
    sections: [
      {
        heading: "Bubbles in the Void",
        paragraphs: [
          "Our Big Bang might have just been one bubble nucleating inside an endlessly inflating 'parent' spacetime. Eternal inflation proposes that space is constantly expanding at a furious rate, but occasionally, small pockets 'freeze' out of this expansion, forming pocket universes.",
          "In this picture, 'the universe' was never a single entity. The Big Bang was merely a localized event, not a universal one. Countless other bubble-universes are forming elsewhere in the bulk.",
          "Each of these pocket universes could run on entirely different physical constants, different numbers of dimensions, or contain no stable matter at all. We happen to live in one where the conditions were just right for stars, planets, and life to form."
        ]
      }
    ]
  },
  {
    id: "ccc",
    title: "Conformal Cyclic Cosmology",
    subtitle: "Roger Penrose's Vision",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/conformal%20cyclic%20cosmology%20geometry%20evaporating%20black%20holes%20abstract?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/2009.00627",
    sections: [
      {
        heading: "The Afterlife of the Cosmos",
        paragraphs: [
          "Nobel laureate Roger Penrose proposed a mind-bending alternative: stretch a universe's far future out to near-total emptiness, where every black hole has evaporated and every particle has decayed into massless photons.",
          "In this state of ultimate entropy, distance and time lose all meaning. The mathematical geometry of that infinitely sparse, cold state perfectly resembles the hot, dense singularity of a new Big Bang.",
          "In this view, our Big Bang is simply the 'afterlife' of a universe that came before, remembered only in the pure geometry of space, with no physical matter carried over. Some researchers even claim to see 'Hawking points' in our cosmic microwave background—supposed 'scars' from the evaporated black holes of the previous universe."
        ]
      }
    ]
  },
  {
    id: "brane-collision",
    title: "Colliding Branes",
    subtitle: "String Theory's Big Bang",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/two%20massive%20membranes%20colliding%20in%20higher%20dimensions%20creating%20universe?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/hep-th/0103239",
    sections: [
      {
        heading: "The Higher-Dimensional Crash",
        paragraphs: [
          "In some string-theory models, our entire three-dimensional universe is just a flat membrane (a 'brane') floating within a much larger, higher-dimensional space, much like a slice of bread in a larger loaf.",
          "According to the Ekpyrotic model, the Big Bang was not an explosion from a single point, but rather the catastrophic result of two massive branes drifting into each other and colliding.",
          "The colossal kinetic energy of the collision was converted into the matter and radiation that fills our universe today. This model suggests that after rebounding, the branes will eventually be pulled back together, causing more collisions and more Big Bangs in the unimaginably distant future."
        ]
      }
    ]
  },
  {
    id: "black-hole-origin",
    title: "Black Holes as Baby Universes",
    subtitle: "Cosmic Natural Selection",
    category: "Cosmology",
    image: "https://image.pollinations.ai/prompt/black%20hole%20singularity%20spawning%20a%20new%20universe%20inside%20wormhole?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/gr-qc/9210014",
    sections: [
      {
        heading: "Nested Realities",
        paragraphs: [
          "One genuinely strange proposal suggests that every black hole in our universe might actually be a doorway to a brand new universe on the other side of its singularity.",
          "This implies that a 'new' Big Bang is happening right now, every single time a massive star collapses. If this is true, our own universe could itself exist inside a massive black hole located in a parent universe.",
          "Physicist Lee Smolin expanded on this with the theory of Cosmological Natural Selection. Universes that produce the most black holes reproduce the most often, meaning the laws of physics evolve over generations to optimize for black hole creation—which coincidentally optimizes for the creation of stars and life."
        ]
      }
    ]
  },
  
  // ASTROPHYSICAL ANOMALIES
  {
    id: "wormholes",
    title: "Wormholes",
    subtitle: "Einstein-Rosen Bridges",
    category: "Astrophysics",
    image: "https://image.pollinations.ai/prompt/traversable%20wormhole%20in%20space%20glowing%20tunnel%20connecting%20galaxies?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1509.01166",
    sections: [
      {
        heading: "Mathematically Valid, Physically Unconfirmed",
        paragraphs: [
          "Wormholes are completely legitimate solutions to Einstein's equations of general relativity—they are literal tunnels linking two distant points in spacetime, allowing for instantaneous travel across the cosmos.",
          "The catch? Every known mathematical solution requires the tunnel to be propped open by 'exotic matter' possessing negative energy density. Without it, the immense gravity of the wormhole would cause it to collapse instantly before even a photon could pass through.",
          "Currently, nothing we've ever observed in the universe behaves like exotic matter in bulk. While quantum mechanics allows for microscopic amounts of negative energy, engineering a traversable, human-sized wormhole remains entirely beyond the realm of known physics."
        ]
      }
    ]
  },
  {
    id: "white-holes",
    title: "White Holes",
    subtitle: "The Impossible Fountains",
    category: "Astrophysics",
    image: "https://image.pollinations.ai/prompt/white%20hole%20spewing%20blinding%20light%20and%20matter%20in%20deep%20space?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1407.0989",
    sections: [
      {
        heading: "Black Holes in Reverse",
        paragraphs: [
          "A white hole is the theoretical inverse of a black hole: instead of matter falling in and never leaving, matter is violently flung out, and nothing is permitted to enter its event horizon.",
          "They emerge from the exact same equations that describe black holes. However, most physicists believe they would be incredibly thermodynamically unstable. The moment a single stray photon or particle of matter touched the white hole's surface, the system would collapse into an ordinary black hole.",
          "While they are likely just a mathematical artifact, some cutting-edge quantum gravity models suggest that black holes don't just evaporate—they eventually 'bounce' and transition into microscopic white holes at the very end of their lifespans."
        ]
      }
    ]
  },
  {
    id: "dyson-spheres",
    title: "Dyson Spheres",
    subtitle: "Capturing a Star",
    category: "Astrophysics",
    image: "https://image.pollinations.ai/prompt/alien%20megastructure%20dyson%20sphere%20encasing%20a%20burning%20star%20sci%20fi?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/2105.02714",
    sections: [
      {
        heading: "The Ultimate Megastructure",
        paragraphs: [
          "Proposed by Freeman Dyson in 1960, a Dyson sphere is a theoretical megastructure built by a highly advanced alien civilization to entirely encase their host star, capturing nearly 100% of its solar energy output.",
          "Unlike wormholes or faster-than-light travel, nothing about a Dyson sphere breaks the known laws of physics. It is purely a matter of extreme engineering. Because of this, human astronomers actively scan the galaxy for them.",
          "The telltale signature of a Dyson sphere would be a star that is unusually dim in the visible light spectrum (because it is blocked by solar collectors) but blazingly bright in the infrared spectrum, as the colossal structure radiates its waste heat into deep space."
        ]
      }
    ]
  },
  {
    id: "great-attractor",
    title: "The Great Attractor",
    subtitle: "The Unseen Mass",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/massive%20gravitational%20anomaly%20pulling%20galaxies%20great%20attractor%20dark?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Great_Attractor",
    sections: [
      {
        heading: "A 14-Million-MPH Pull",
        paragraphs: [
          "There is a massive gravitational anomaly pulling our entire Milky Way galaxy—along with hundreds of thousands of other neighboring galaxies—toward it at a staggering speed of 14 million miles per hour.",
          "Frustratingly, this colossal object sits directly behind the 'Zone of Avoidance', the dense, dusty plane of our own Milky Way, which completely blocks our view. We can measure its immense gravitational tug, but we cannot see what is doing the pulling.",
          "Current estimates suggest the Great Attractor contains the mass of tens of thousands of Milky Ways. Everything we know about it, we know secondhand, simply by observing how it violently bends and dictates the paths of the galaxies caught in its grip."
        ]
      }
    ]
  },
  {
    id: "axis-of-evil",
    title: "The Axis of Evil",
    subtitle: "A Glitch in the Background",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/cosmic%20microwave%20background%20map%20with%20a%20strange%20glowing%20axis%20alignment?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/astro-ph/0502237",
    sections: [
      {
        heading: "The Cosmic Alignment",
        paragraphs: [
          "The Cosmic Microwave Background (CMB) is the faint, leftover radiation from the Big Bang. According to the cosmological principle, the universe should be isotropic—meaning the CMB should look completely random and identical in every direction.",
          "However, astronomers discovered a strange, unexplained alignment in the CMB data. Several key temperature fluctuations inexplicably align perfectly with the plane of our own solar system.",
          "In a truly random universe, this alignment should be statistically impossible. Dubbed the 'Axis of Evil', nobody has a confirmed explanation for it. Some suspect it is a subtle instrument error, while others argue it is the first real proof that the universe isn't as uniform as our best physics models assume."
        ]
      }
    ]
  },
  {
    id: "wow-signal",
    title: "The Wow! Signal",
    subtitle: "The 72-Second Mystery",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/retro%20radio%20telescope%20printout%20with%20WOW%20written%20in%20red%20ink%20alien%20signal?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Wow!_signal",
    sections: [
      {
        heading: "The Ultimate SETI Candidate",
        paragraphs: [
          "In 1977, the Big Ear radio telescope in Ohio picked up a continuous, 72-second burst of radio energy from the constellation Sagittarius. The signal was so incredibly strong and structured that astronomer Jerry Ehman circled the data on the computer printout and wrote 'Wow!' in the margin.",
          "Most intriguingly, the signal arrived on a frequency of 1420 MHz. This is the resonant frequency of hydrogen, the most common element in the universe. Many SETI scientists have long argued that if an intelligent alien civilization wanted to broadcast a universal greeting, they would use the hydrogen frequency because any spacefaring species would be listening to it.",
          "Despite decades of trying, the signal has never repeated. It has no confirmed natural source, and remains the single most tantalizing piece of evidence that we might not be alone."
        ]
      }
    ]
  },
  {
    id: "dark-flow",
    title: "Dark Flow",
    subtitle: "The Extradimensional Tug",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/clusters%20of%20galaxies%20drifting%20in%20unison%20pulled%20by%20unseen%20force%20dark?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/0809.3734",
    sections: [
      {
        heading: "Drifting Outside the Universe",
        paragraphs: [
          "Astronomers have observed clusters of galaxies drifting in a suspiciously uniform direction, independent of the normal expansion of the universe. They are moving at tremendous speeds toward a patch of sky between the constellations Centaurus and Vela.",
          "The force pulling them is utterly immense, yet there is no observable mass within our universe that can account for it. This has led scientists to propose that the galaxies are being tugged by something located *outside* our observable universe.",
          "If Dark Flow is real, it suggests that the mass and structure beyond our cosmic horizon is deeply uneven, possibly representing the gravitational ghost of a sister universe or a remnant structure that existed before cosmic inflation smoothed everything out."
        ]
      }
    ]
  },
  {
    id: "oumuamua",
    title: "'Oumuamua",
    subtitle: "The Interstellar Visitor",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/cigar%20shaped%20asteroid%20oumuamua%20drifting%20through%20solar%20system%20space?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1810.11490",
    sections: [
      {
        heading: "The Unexplained Acceleration",
        paragraphs: [
          "In 2017, telescopes detected 'Oumuamua, the first confirmed interstellar object to pass through our solar system. It was moving far too fast to be gravitationally bound to our sun, meaning it had been drifting through interstellar space for millions of years.",
          "It possessed an incredibly odd, elongated cigar-like shape. More bafflingly, as it left the solar system, it inexplicably accelerated. Normal comets accelerate when the sun heats their ice, causing outgassing that acts like a rocket thruster—but 'Oumuamua showed absolutely no signs of a comet tail or outgassing.",
          "The anomaly was so severe that Harvard astronomer Avi Loeb published a paper suggesting it might be an artificial light-sail built by an alien civilization. While the mainstream consensus still leans toward a strange natural phenomenon, its true nature remains fiercely debated."
        ]
      }
    ]
  },
  {
    id: "time-crystals",
    title: "Time Crystals",
    subtitle: "Motion Without Energy",
    category: "Physics",
    image: "https://image.pollinations.ai/prompt/glowing%20quantum%20time%20crystal%20structure%20fractal%20repeating%20in%20darkness?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1910.10745",
    sections: [
      {
        heading: "Breaking the Rules of Thermodynamics",
        paragraphs: [
          "A regular crystal (like a diamond) is an object whose atoms are arranged in a repeating pattern in space. A 'time crystal' is a structure whose atoms are arranged in a repeating pattern in *time*.",
          "First successfully created in a quantum laboratory in 2016, a time crystal constantly moves, pulses, and shifts between states, but it expends absolutely zero energy to do so.",
          "It violates our intuitive understanding of thermodynamics, which states that systems should always settle into a quiet equilibrium. Time crystals exist in a perpetual state of motion without losing any energy, representing an entirely new phase of matter that behaves unlike anything else in the cosmos."
        ]
      }
    ]
  },
  
  // MIND-BENDING THEORIES
  {
    id: "simulation-hypothesis",
    title: "The Simulation Hypothesis",
    subtitle: "Are We Computed?",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/hyperrealistic%20universe%20dissolving%20into%20green%20matrix%20code%20digital?width=800&height=1000&nologo=true",
    link: "https://www.simulation-argument.com/simulation.pdf",
    sections: [
      {
        heading: "Nick Bostrom's Trilemma",
        paragraphs: [
          "In 2003, Oxford philosopher Nick Bostrom proposed a terrifyingly logical argument: if any civilization ever becomes capable of running hyper-realistic ancestor-simulations, and chooses to run many of them, then statistically, most 'people' in existence would be simulated minds.",
          "Bostrom states that one of three things must be true: 1) Every intelligent civilization goes extinct before reaching the technology to simulate reality. 2) Advanced civilizations reach the technology, but universally lose interest in running simulations.",
          "3) If neither of the first two are true, then billions of simulations are currently running. Because there would only be one 'base reality' and billions of simulated realities, the statistical probability that we are the ones in base reality is practically zero. Therefore, we are almost certainly living inside a computer."
        ]
      }
    ]
  },
  {
    id: "many-worlds",
    title: "Many-Worlds Interpretation",
    subtitle: "The Branching Multiverse",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/infinite%20branching%20realities%20fractal%20universes%20splitting%20apart?width=800&height=1000&nologo=true",
    link: "https://plato.stanford.edu/entries/qm-manyworlds/",
    sections: [
      {
        heading: "Every Choice Happened",
        paragraphs: [
          "In traditional quantum mechanics, particles exist in a state of probability until they are observed, at which point the waveform 'collapses' into a single definitive outcome.",
          "The Many-Worlds Interpretation argues that the waveform never collapses at all. Instead, every time a quantum event has multiple possible outcomes, the universe splits. All outcomes actually happen, each spawning its own entirely new, branching universe.",
          "This means there is a version of you in a parallel branch who made different choices today. There is a branch where you are wealthy, a branch where humanity never existed, and a branch where you are reading a slightly different version of this very sentence."
        ]
      }
    ]
  },
  {
    id: "extra-dimensions",
    title: "Hidden Dimensions",
    subtitle: "Curled Up Spacetime",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/microscopic%20curled%20up%20dimensions%20calabi%20yau%20manifold%20string%20theory?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/String_theory",
    sections: [
      {
        heading: "The 11-Dimensional Reality",
        paragraphs: [
          "String theory is currently physics' best attempt at a 'Theory of Everything'. However, the math completely breaks down if the universe only has the four dimensions we experience (three of space, one of time).",
          "To make the equations work, reality must have ten or even eleven dimensions. So where are the other seven?",
          "Physicists propose that while the first three expanded massively during the Big Bang, the extra dimensions remained 'curled up' into unimaginably tiny, microscopic loops. They exist everywhere, at every single point in space, but are so tightly wound that nothing at our macroscopic scale can ever interact with or detect them directly."
        ]
      }
    ]
  },
  {
    id: "doomsday-argument",
    title: "The Doomsday Argument",
    subtitle: "A Terrifying Statistic",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/dark%20apocalyptic%20earth%20hourglass%20running%20out%20of%20sand%20doomsday?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Doomsday_argument",
    sections: [
      {
        heading: "The Mathematics of Extinction",
        paragraphs: [
          "The Doomsday argument relies on a deeply uncomfortable piece of statistical reasoning called the Copernican principle. It states that if you are a randomly selected human out of everyone who will ever live, you are overwhelmingly likely to be born somewhere in the thick middle of humanity's total population timeline.",
          "It is statistically incredibly unlikely that you happen to be in the first 0.001% of all humans who will ever exist. However, given our explosive population growth, nearly 10% of all humans who have ever lived are alive right now.",
          "If we are in the 'middle' of the total human lifespan, and not the very beginning, the math implies that humanity only has a few thousand years left before going extinct. If humanity was going to colonize the galaxy and live for millions of years, you would be a massive statistical anomaly for being born this early."
        ]
      }
    ]
  },
  
  // FERMI PARADOX
  {
    id: "great-filter",
    title: "The Great Filter",
    subtitle: "The Silent Cosmos",
    category: "The Fermi Paradox",
    image: "https://image.pollinations.ai/prompt/ancient%20abandoned%20alien%20megastructure%20drifting%20in%20dark%20space%20filter?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Great_Filter",
    sections: [
      {
        heading: "The Universal Death Trap",
        paragraphs: [
          "The Fermi Paradox asks a simple question: Given the billions of habitable planets and the billions of years the galaxy has existed, where are all the extraterrestrial civilizations?",
          "The 'Great Filter' theory answers this by suggesting there is a developmental barrier in evolutionary history that is extraordinarily difficult for life to cross. This filter destroys nearly every species that encounters it.",
          "The most terrifying aspect of this theory is not knowing where the filter is. If the filter is 'single-celled organisms evolving into multi-celled life', then we have already passed it, and we are safely alone in the universe. But if the filter is 'advanced civilizations inevitably destroy themselves with nuclear or biological weapons', then the filter lies in our future, and our extinction is almost guaranteed."
        ]
      }
    ]
  },
  {
    id: "dark-forest",
    title: "The Dark Forest Hypothesis",
    subtitle: "Why We Shouldn't Shout",
    category: "The Fermi Paradox",
    image: "https://image.pollinations.ai/prompt/dark%20terrifying%20space%20void%20with%20faint%20hidden%20predator%20eyes%20alien?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Dark_forest_hypothesis",
    sections: [
      {
        heading: "The Predators in the Void",
        paragraphs: [
          "A deeply chilling answer to the Fermi Paradox, popularized by Liu Cixin's sci-fi novel. It proposes that the universe is teeming with life, but every civilization is deliberately staying completely silent.",
          "The logic dictates that because resources are finite and intentions cannot be verified across light-years, the safest assumption for any advanced species is that all other species are a threat. The universe is a dark forest full of quiet, wary hunters.",
          "In this scenario, any civilization foolish enough to broadcast their location via radio waves is immediately identified and annihilated by a superior predator species. By blasting our radio signals into space, humanity might be ringing a dinner bell."
        ]
      }
    ]
  },
  {
    id: "boltzmann-brains",
    title: "Boltzmann Brains",
    subtitle: "Spontaneous Consciousness",
    category: "The Fermi Paradox",
    image: "https://image.pollinations.ai/prompt/surreal%20human%20brain%20floating%20in%20deep%20space%20quantum%20fluctuations?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1702.00850",
    sections: [
      {
        heading: "The Ultimate Illusion",
        paragraphs: [
          "Named after physicist Ludwig Boltzmann, this thought experiment pushes quantum mechanics to its absolute limit.",
          "Over an infinite amount of time, random quantum fluctuations will eventually assemble every possible configuration of matter. Statistically, it is vastly more likely for a localized quantum fluctuation to spontaneously assemble a single, fully-formed human brain floating in the void—complete with false memories of a life lived—than it is for an entire, highly-ordered universe like ours to form.",
          "This leads to a horrific philosophical trap: you cannot definitively prove that you are a real person on Earth, rather than a Boltzmann Brain that materialized in deep space a millisecond ago, hallucinating this exact moment right before freezing to death."
        ]
      }
    ]
  },
  {
    id: "zoo-hypothesis",
    title: "The Zoo Hypothesis",
    subtitle: "We Are the Exhibit",
    category: "The Fermi Paradox",
    image: "https://image.pollinations.ai/prompt/earth%20encased%20in%20a%20faint%20alien%20energy%20shield%20observed%20by%20ships?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Zoo_hypothesis",
    sections: [
      {
        heading: "The Cosmic Quarantine",
        paragraphs: [
          "What if advanced civilizations already know we're here, but have deliberately chosen a policy of absolute non-interference? The Zoo Hypothesis suggests that Earth is intentionally being isolated.",
          "Super-advanced aliens might view humanity the same way we view a wildlife sanctuary or an uncontacted indigenous tribe. They observe us from afar, allowing our society and culture to develop naturally without the massive shock of extraterrestrial contact.",
          "They are simply waiting for humanity to cross a certain technological or ethical threshold—such as mastering faster-than-light travel or achieving global peace—before they reveal themselves and invite us into the galactic community."
        ]
      }
    ]
  },
  
  // MYTHS
  {
    id: "indras-net",
    title: "Indra's Net & The Hologram",
    subtitle: "Myths that Echo Physics",
    category: "Myths & Legends",
    image: "https://image.pollinations.ai/prompt/infinite%20glowing%20spider%20web%20with%20jewels%20reflecting%20galaxies%20myth?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Holographic_principle",
    sections: [
      {
        heading: "The Myth",
        paragraphs: [
          "In Hindu and Buddhist cosmology, Indra's Net is an infinite web that stretches across the universe. At every node of the web hangs a multifaceted jewel. If you look closely at any single jewel, you will see all the other infinite jewels reflected in it.",
          "It is a beautiful metaphor for total interconnection, where the entirety of the cosmos is somehow fully contained within every single one of its smallest parts."
        ]
      },
      {
        heading: "The Science: The Holographic Principle",
        paragraphs: [
          "Astonishingly, modern string theory arrived at a nearly identical concept. The Holographic Principle proposes that all the 3D information contained within a volume of space can be mathematically encoded on the 2D boundary surrounding it.",
          "Just like a 2D hologram contains all the information needed to project a 3D image, our entire three-dimensional reality might merely be a projection of information stored on the distant, two-dimensional boundary of the universe. The whole is contained in the surface."
        ]
      }
    ]
  },
  {
    id: "ouroboros",
    title: "Ouroboros & The Bounce",
    subtitle: "Myths that Echo Physics",
    category: "Myths & Legends",
    image: "https://image.pollinations.ai/prompt/glowing%20ouroboros%20snake%20eating%20its%20tail%20made%20of%20galaxies%20stars?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Ouroboros",
    sections: [
      {
        heading: "The Myth",
        paragraphs: [
          "The Ouroboros, the ancient symbol of a serpent eating its own tail, appears in Egyptian, Norse, and Hindu mythology. It represents a universe that ends only to recreate itself from its own destruction—an endless loop with no true beginning or end."
        ]
      },
      {
        heading: "The Science: Cyclic Cosmology",
        paragraphs: [
          "This mirrors the modern Big Bounce theory and Roger Penrose's Conformal Cyclic Cosmology, where the universe does not have a definitive 'beginning' from nothing.",
          "Instead, the death and collapse of one universe provides the exact mathematical and physical fuel required to ignite the Big Bang of the next. The cosmos is eternally eating itself to give birth to itself."
        ]
      }
    ]
  },
  {
    id: "ginnungagap",
    title: "Ginnungagap & The Vacuum",
    subtitle: "Myths that Echo Physics",
    category: "Myths & Legends",
    image: "https://image.pollinations.ai/prompt/vast%20empty%20glowing%20void%20between%20fire%20and%20ice%20norse%20mythology?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Quantum_fluctuation",
    sections: [
      {
        heading: "The Myth",
        paragraphs: [
          "In ancient Norse mythology, before the world was created, there was no earth, no heaven, and no stars. There was only Ginnungagap, the 'yawning void'—a formless, chaotic emptiness that sat between the realms of fire and ice.",
          "It was from the volatile interactions within this formless void that the first giant was born, and from his body, the universe was built."
        ]
      },
      {
        heading: "The Science: Quantum Vacuum",
        paragraphs: [
          "Modern quantum field theory describes the exact same concept. A true vacuum in space is not 'empty'. It is a boiling sea of quantum fluctuations, where virtual particles violently pop in and out of existence.",
          "Cosmologists believe that our universe was born precisely from this 'yawning void'—a random quantum fluctuation in a formless energetic vacuum that expanded rapidly during inflation to become everything we see today."
        ]
      }
    ]
  },
  
  // THE MONSTER
  {
    id: "extradimensional-monster",
    title: "Crossing the Multiverse",
    subtitle: "What The Telescope Actually Saw",
    category: "Concepts",
    image: "https://image.pollinations.ai/prompt/massive%20shadowy%20cosmic%20entity%20larger%20than%20galaxies%20looming%20in%20void?width=800&height=1000&nologo=true",
    link: "#",
    sections: [
      {
        heading: "Scale Beyond Comprehension",
        paragraphs: [
          "If an entity could cross over from a parent universe into ours, ordinary physics and biology would not apply to it. To even register against the scale of a universe, it would have to dwarf the largest structures we know of.",
          "The largest known galaxy, IC 1101, is 4 million light-years across. For an entity from the bulk multiverse to step into our universe, it would likely operate on the scale of a supercluster at minimum. Entire galaxies would be smaller than a single one of its 'cells'.",
          "If it came from a universe with different physical constants—a different strength of gravity or a different speed of light—it might not 'land' so much as unravel the fabric of spacetime around it."
        ]
      },
      {
        heading: "A Short Story: The Anomaly",
        paragraphs: [
          "The anomaly first showed up as a rounding error. A supercluster that should have been drifting apart under normal expansion was curving slightly toward a point that corresponded to nothing—no galaxy, no dark matter halo. Just a mathematical 'somewhere' that things bent toward.",
          "It took the team six years to admit the shape of the bend wasn't random. It took another two to admit that the shape, mapped across enough of the sky, looked less like a gravitational well and more like the outline of something with a front and a back.",
          "Nobody used the word 'creature' in the published paper. Several of them used it privately, after midnight, when the coffee had run out and the data still hadn't changed. The last line of their internal notes read simply: 'If this is a shoulder, we don't want to see the rest of it.'"
        ]
      }
    ]
  }
];

fs.writeFileSync('lib/theoriesData.json', JSON.stringify(theories, null, 2));
console.log('Successfully wrote to lib/theoriesData.json');
