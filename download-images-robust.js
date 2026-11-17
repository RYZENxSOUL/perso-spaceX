const fs = require('fs');
const https = require('https');

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
  
  for (let theory of data) {
    if (theory.image.includes('picsum.photos') || theory.image.includes('pollinations')) {
      const filename = `/images/theories/${theory.id}.jpg`;
      const localPath = `public${filename}`;
      
      if (fs.existsSync(localPath) && fs.statSync(localPath).size > 5000) {
        console.log(`Already have ${theory.id}.jpg`);
        theory.image = filename;
        continue;
      }

      console.log(`Downloading AI image for ${theory.title}...`);
      
      // Create a highly specific prompt for space/sci-fi
      let prompt = `A hyperrealistic cinematic sci-fi depiction of ${theory.title.replace(/[^a-zA-Z0-9 ]/g, '')} in deep space dark mystery 8k`.replace(/ /g, '%20');
      let url = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=1000&nologo=true`;

      const success = await downloadFile(url, localPath);
      if (success) {
        theory.image = filename;
        console.log(`Success! Waiting 3 seconds...`);
        await new Promise(r => setTimeout(r, 3000)); // 3 second delay to prevent rate limits
      } else {
        console.log(`Failed to download ${theory.id}, will leave as is.`);
      }
    }
  }

  fs.writeFileSync('lib/theoriesData.json', JSON.stringify(data, null, 2));
  console.log('Finished updating all images to high-quality local AI images.');
}

fixImages();
