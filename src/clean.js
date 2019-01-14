const fs = require('fs');

const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recurse
        console.log('deleted folder', curPath);
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        console.log('unlinkSync', curPath);
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive('output');

module.exports = {
  deleteFolderRecursive
};
