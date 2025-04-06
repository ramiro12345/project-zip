const fs = require('fs');
const path = require('path');
const https = require('https');
const AdmZip = require('adm-zip');

function downloadFileStream(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Error al descargar archivo: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

exports.downloadAndExtractZip = async (url) => {
  const zipName = path.basename(url).replace('.zip', '');
  const zipPath = path.join(__dirname, '..', 'storage', `${zipName}.zip`);
  const outputDir = path.join(__dirname, '..', 'storage', zipName);

  if (!fs.existsSync(path.join(__dirname, '..', 'storage'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'storage'));
  }


  await downloadFileStream(url, zipPath);

  const zip = new AdmZip(zipPath);
  
  zip.extractAllTo(outputDir, true);

  const files = fs.readdirSync(outputDir);
  const filteredFiles = files.filter(f => f.endsWith('.html') || f.endsWith('.xml'));

  return filteredFiles.map(filename => ({
    filename,
    filepath: path.join('storage', zipName, filename),
    filetype: path.extname(filename).replace('.', '')
  }));
};
