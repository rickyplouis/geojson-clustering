const fs = require('fs');


const filesToDelete = ['output.geojson'];

for (let file of filesToDelete) {
  fs.unlink(file, (err) => {
    if (err) throw err;
    console.log(`${file} was deleted`);
  })
}
