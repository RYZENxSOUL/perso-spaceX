const fs = require('fs');

const moreTheories = [
  {
    id: "vacuum-decay",
    title: "Vacuum Decay",
    subtitle: "The Speed-of-Light Destruction",
    category: "The Fermi Paradox",
    image: "https://image.pollinations.ai/prompt/expanding%20bubble%20of%20true%20vacuum%20destroying%20galaxies%20at%20light%20speed?width=800&height=1000&nologo=true",
    link: "https://arxiv.org/abs/1802.00319",
    sections: [
      {
        heading: "The False Vacuum",
        paragraphs: [
          "Our universe might be sitting in a false energy minimum. A random quantum event somewhere could, in theory, trigger a tiny bubble of 'true vacuum' to nucleate.",
          "This bubble of lower energy would expand outward at exactly the speed of light, fundamentally rewriting the laws of physics and atomic structure as it goes. Because it travels at the speed of light, no warning signal could ever precede it.",
          "It could already be happening right now, expanding rapidly toward us. If it reached Earth, we would simply cease to exist instantly, without ever seeing it coming."
        ]
      }
    ]
  },
  {
    id: "quantum-immortality",
    title: "Quantum Immortality",
    subtitle: "You Never Truly Die",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/abstract%20soul%20surviving%20quantum%20death%20branching%20timelines%20ghost?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Quantum_suicide_and_immortality",
    sections: [
      {
        heading: "The Subjective Survivor",
        paragraphs: [
          "A deeply strange and unsettling consequence of the Many-Worlds Interpretation. If every possible outcome happens across branching universes, then in any lethal situation, there is always a branch where you miraculously survive.",
          "Because your consciousness ceases to exist in the branches where you die, there is no 'you' left to experience death. Therefore, from your own first-person, subjective perspective, you can only ever experience the branches where you survive.",
          "This implies that subjectively, you might never experience your own death. No matter how incredibly unlikely your continued survival becomes, your consciousness will always seamlessly shift to the one wildly improbable branch where you somehow lived."
        ]
      }
    ]
  },
  {
    id: "mandela-effect",
    title: "The Mandela Effect",
    subtitle: "Bleeding Realities",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/surreal%20memory%20glitch%20matrix%20glitch%20alternate%20reality%20timeline?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/False_memory#Mandela_Effect",
    sections: [
      {
        heading: "Shared False Memories",
        paragraphs: [
          "The Mandela Effect is the real, well-documented phenomenon where massive groups of unrelated people share the exact same false memory of an event or detail that never actually happened.",
          "While psychologists attribute this to ordinary quirks of human memory and the rapid spread of misinformation, internet culture has embraced a much more sci-fi explanation.",
          "Fringe theorists half-jokingly argue that it is evidence of Many-Worlds branches bleeding into each other. When millions remember a movie line or a corporate logo differently than it exists today, they claim it's because those people originally came from a slightly different timeline branch that collapsed into ours."
        ]
      }
    ]
  },
  {
    id: "digital-physics",
    title: "Digital Physics",
    subtitle: "The Universe as Code",
    category: "Brain Breakers",
    image: "https://image.pollinations.ai/prompt/digital%20physics%20universe%20made%20of%20binary%20code%201s%20and%200s%20glowing?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Digital_physics",
    sections: [
      {
        heading: "Information is Fundamental",
        paragraphs: [
          "A stranger cousin of the simulation hypothesis: rather than a simulation being run on someone else's supercomputer, some physicists have seriously asked whether the universe itself is fundamentally made of pure information.",
          "In this view, the basic building block of reality isn't matter or energy, but something much closer to a binary bit. Physics is really just very elaborate computation running on nothing at all.",
          "Famous physicist John Archibald Wheeler coined this concept 'It from bit', suggesting that every particle, every force, and the entire fabric of spacetime is entirely derived from yes/no answers to binary questions."
        ]
      }
    ]
  },
  {
    id: "fast-radio-bursts",
    title: "Fast Radio Bursts",
    subtitle: "The Millisecond Mystery",
    category: "Anomalies",
    image: "https://image.pollinations.ai/prompt/intense%20millisecond%20burst%20of%20energy%20radio%20wave%20from%20deep%20space?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Fast_radio_burst",
    sections: [
      {
        heading: "Cosmic Flashes",
        paragraphs: [
          "Fast Radio Bursts (FRBs) are intense, inexplicable flashes of radio energy from deep, extragalactic space. They last only a few milliseconds, but in that brief instant, they release as much energy as our Sun produces in three days.",
          "The vast majority are one-off events that never repeat. However, astronomers have recently discovered a handful of sources that fire again and again.",
          "One specific FRB repeats in a suspiciously regular, 16-day cycle that nobody has fully explained. While leading theories point to highly magnetic neutron stars called magnetars, some speculative ideas have proposed they could be the exhaust plumes of massive alien light-sails accelerating across the cosmos."
        ]
      }
    ]
  },
  {
    id: "yggdrasil",
    title: "Yggdrasil & The Multiverse",
    subtitle: "Myths that Echo Physics",
    category: "Myths & Legends",
    image: "https://image.pollinations.ai/prompt/massive%20world%20tree%20yggdrasil%20connecting%20glowing%20planets%20norse?width=800&height=1000&nologo=true",
    link: "https://en.wikipedia.org/wiki/Yggdrasil",
    sections: [
      {
        heading: "The Myth",
        paragraphs: [
          "In Norse mythology, Yggdrasil is the immense World Tree whose sprawling roots and branches connect nine completely separate realms of existence.",
          "This vast cosmic tree allows certain powerful beings and gods to travel between entirely different worlds, sliding along its trunk from one distinct reality to another."
        ]
      },
      {
        heading: "The Science: Branching Realities",
        paragraphs: [
          "Both the Many-Worlds Interpretation of quantum mechanics and the theory of Eternal Inflation picture reality as a massive, branching structure.",
          "Every 'world' or 'bubble universe' is connected to the others through the exact same underlying mathematical trunk. The ancient vision of a tree holding countless separate realities in its branches is a startlingly accurate metaphor for modern multiverse geometry."
        ]
      }
    ]
  }
];

const data = JSON.parse(fs.readFileSync('lib/theoriesData.json'));
const merged = [...data, ...moreTheories];
fs.writeFileSync('lib/theoriesData.json', JSON.stringify(merged, null, 2));
console.log('Successfully appended missing theories to lib/theoriesData.json');
