const fs = require('fs');
const https = require('https');

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        resolve(false);
        return;
      }
      const stream = fs.createWriteStream(path);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(true);
      });
    }).on('error', (err) => {
        console.error(`Error downloading ${url}:`, err.message);
        resolve(false);
    });
  });
};

async function fixImages() {
  const data = JSON.parse(fs.readFileSync('lib/theoriesData.json'));
  
  // Track which images are duplicates (appear more than once)
  const imageCounts = {};
  for (let theory of data) {
    if (!imageCounts[theory.image]) {
      imageCounts[theory.image] = 0;
    }
    imageCounts[theory.image]++;
  }

  console.log("Found image usage counts:", imageCounts);

  let i = 0;
  for (let theory of data) {
    // If the image is used by multiple theories, it's a duplicate. We should generate a unique one!
    if (imageCounts[theory.image] > 1) {
      // Except for the first one that claimed it
      imageCounts[theory.image]--; 
      
      const filename = `/images/theories/${theory.id}.jpg`;
      const localPath = `public${filename}`;
      
      console.log(`Generating unique AI image for ${theory.title}...`);
      
      let prompt = `A hyperrealistic cinematic sci-fi depiction of ${theory.title.replace(/[^a-zA-Z0-9 ]/g, '')} in deep space dark mystery 8k`.replace(/ /g, '%20');
      // Add a random seed to bust cache
      let url = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=1000&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;

      const success = await downloadFile(url, localPath);
      if (success) {
        theory.image = filename;
        console.log(`Success! Waiting 5 seconds...`);
        await new Promise(r => setTimeout(r, 5000));
      } else {
        console.log(`Failed to download ${theory.id}, will leave as is.`);
      }
    }
  }

  fs.writeFileSync('lib/theoriesData.json', JSON.stringify(data, null, 2));
  console.log('Finished updating all duplicate images to unique local AI images.');
}

fixImages();
