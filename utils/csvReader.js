const fs = require('fs');
const csv = require('csv-parser');

async function readCSV() {
  const websites = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('src/config/websites.csv')
      .pipe(csv())
      .on('data', (row) => {
        websites.push(row);
      })
      .on('end', () => {
        resolve(websites);
      })
      .on('error', reject);
  });
}

module.exports = readCSV;
