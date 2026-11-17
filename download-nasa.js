const fs = require('fs');
const https = require('https');

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects (NASA API sometimes redirects)
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, path).then(resolve).catch(reject);
      }
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

const searchNasa = (query) => {
  return new Promise((resolve, reject) => {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.collection.items);
        } catch(e) { resolve([]); }
      });
    }).on('error', reject);
  });
}

async function fixImagesNasa() {
  const data = JSON.parse(fs.readFileSync('lib/theoriesData.json'));
  
  const imageCounts = {};
  for (let theory of data) {
    if (!imageCounts[theory.image]) {
      imageCounts[theory.image] = 0;
    }
    imageCounts[theory.image]++;
  }

  const keywords = ["nebula", "galaxy", "deep space", "black hole", "telescope", "star cluster", "supernova", "milky way"];
  let kIdx = 0;

  for (let theory of data) {
    if (imageCounts[theory.image] > 1) {
      imageCounts[theory.image]--; 
      
      const filename = `/images/theories/${theory.id}.jpg`;
      const localPath = `public${filename}`;
      
      console.log(`Fetching real NASA image for ${theory.title}...`);
      
      // Try to search NASA based on a generic space keyword
      const keyword = keywords[kIdx % keywords.length];
      kIdx++;
      
      const items = await searchNasa(keyword);
      if (items && items.length > 0) {
        // Pick a random image from the top 10 results
        const randomItem = items[Math.floor(Math.random() * Math.min(10, items.length))];
        // The API provides an array of links in a separate href, but the thumbnail is readily available
        const links = randomItem.links || [];
        if (links.length > 0) {
          let imageUrl = links[0].href;
          // Try to get the medium or original size instead of thumb if possible, by replacing ~thumb with ~medium
          imageUrl = imageUrl.replace('~thumb', '~medium');
          
          console.log(`Downloading ${imageUrl}`);
          const success = await downloadFile(imageUrl, localPath);
          if (success) {
            theory.image = filename;
            console.log(`Success! Saved to ${filename}`);
          }
        }
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  fs.writeFileSync('lib/theoriesData.json', JSON.stringify(data, null, 2));
  console.log('Finished updating duplicate images with real NASA space photography!');
}

fixImagesNasa();
