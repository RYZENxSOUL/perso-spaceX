const fs = require('fs');

const data = JSON.parse(fs.readFileSync('lib/theoriesData.json'));

const availableImages = [
  "/images/theories/ether.jpg",
  "/images/theories/olbers.jpg",
  "/images/theories/moon.jpg",
  "/images/theories/big_bounce.jpg",
  "/images/theories/white_hole.jpg",
  "/images/theories/dyson_sphere.jpg",
  "/images/theories/simulation.jpg",
  "/images/theories/fermi.jpg",
  "/images/theories/false_vacuum.jpg"
];

const categoryMap = {
  "Cosmology": "/images/theories/big_bounce.jpg",
  "Classical Physics": "/images/theories/ether.jpg",
  "Illusions": "/images/theories/moon.jpg",
  "Astrophysics": "/images/theories/white_hole.jpg",
  "Anomalies": "/images/theories/olbers.jpg",
  "Physics": "/images/theories/dyson_sphere.jpg",
  "Brain Breakers": "/images/theories/simulation.jpg",
  "The Fermi Paradox": "/images/theories/fermi.jpg",
  "Myths & Legends": "/images/theories/moon.jpg",
  "Concepts": "/images/theories/false_vacuum.jpg"
};

for (let theory of data) {
  // If the theory already has a local image, keep it
  if (!theory.image.startsWith('http') && theory.image.includes('.jpg')) {
    continue;
  }
  
  // Otherwise, assign a relevant local image based on category
  if (categoryMap[theory.category]) {
    theory.image = categoryMap[theory.category];
  } else {
    theory.image = "/images/theories/simulation.jpg";
  }
}

fs.writeFileSync('lib/theoriesData.json', JSON.stringify(data, null, 2));
console.log('Fixed all images to use highly relevant local AI images.');
