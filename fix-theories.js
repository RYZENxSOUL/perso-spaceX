const fs = require('fs');
const https = require('https');

const originalTheories = [
  {
    id: "ether",
    title: "Does the Ether Exist?",
    subtitle: "The Ghostly Medium of Space",
    category: "Classical Physics",
    image: "/images/theories/ether.jpg",
    link: "https://en.wikipedia.org/wiki/Luminiferous_aether",
    sections: [
      {
        heading: "The Myth/Theory",
        paragraphs: ["In the 19th century, physicists believed light was a wave, and because all known waves needed a medium to travel through (like sound through air), space had to be filled with an invisible substance called the luminiferous ether."]
      },
      {
        heading: "Why it fell apart",
        paragraphs: ["In 1887, the famous Michelson-Morley experiment tried to detect the Earth moving through this 'ether wind.' They found nothing, proving that light travels at a constant speed in a vacuum without needing any medium."]
      },
      {
        heading: "The Modern Twist",
        paragraphs: ["Modern physics suggests space is not actually empty. Quantum field theory tells us space is filled with quantum fields (like the Higgs field) and dark energy, meaning the idea of an underlying 'fabric' of space was partially right, just not in the way 19th-century scientists thought."]
      }
    ]
  },
  {
    id: "olbers",
    title: "Why Is the Universe Dark?",
    subtitle: "Olbers' Paradox",
    category: "Cosmology",
    image: "/images/theories/olbers.jpg",
    link: "https://en.wikipedia.org/wiki/Olbers%27_paradox",
    sections: [
      {
        heading: "The Paradox",
        paragraphs: ["If the universe is infinitely large and filled with billions of trillion stars, every single point in the night sky should eventually land on the surface of a star. The night sky ought to be as blindingly bright as the surface of the Sun!"]
      },
      {
        heading: "Why it's actually dark",
        paragraphs: [
          "The Universe Has an Age: The universe is roughly 13.8 billion years old, so light from stars further away than 13.8 billion light-years hasn't had enough time to reach us yet.",
          "The Universe Is Expanding: As light travels through expanding space, its wavelength gets stretched into longer, lower-energy wavelengths (infrared and microwaves). The sky is actually glowing with light—the Cosmic Microwave Background—but human eyes cannot see it without radio telescopes."
        ]
      }
    ]
  },
  {
    id: "moon",
    title: "The Moon Illusion",
    subtitle: "Ancient Myths & Brain Tricks",
    category: "Illusions",
    image: "/images/theories/moon.jpg",
    link: "https://www.pnas.org/doi/10.1073/pnas.1219366110",
    sections: [
      {
        heading: "The Illusion",
        paragraphs: ["Why does the Moon look giant when it's near the horizon, but small when it's high in the sky?"]
      },
      {
        heading: "The Reality",
        paragraphs: ["It's a trick played by the human brain (the Ponzo illusion). When near the horizon, your brain compares the Moon to foreground objects like trees and buildings, tricking you into perceiving it as much larger than it actually is. If you hold up a dime at arm's length, it covers the moon exactly the same regardless of its height."]
      }
    ]
  }
];

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(false);
        return;
      }
      const stream = fs.createWriteStream(path);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(true);
      });
    }).on('error', (err) => reject(err));
  });
};

async function processTheories() {
  const data = JSON.parse(fs.readFileSync('lib/theoriesData.json'));
  
  console.log("Downloading images...");
  for (let theory of data) {
    if (theory.image.startsWith('http')) {
      const filename = `/images/theories/${theory.id}.jpg`;
      const localPath = `public${filename}`;
      console.log(`Downloading ${theory.id}...`);
      await downloadFile(theory.image, localPath);
      theory.image = filename;
      // Wait to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Prepend the missing original theories
  const allIds = data.map(d => d.id);
  const toAdd = originalTheories.filter(ot => !allIds.includes(ot.id));
  
  const merged = [...toAdd, ...data];
  fs.writeFileSync('lib/theoriesData.json', JSON.stringify(merged, null, 2));
  console.log('All done! Merged and images downloaded locally.');
}

processTheories();
