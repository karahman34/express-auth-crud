const fs = require('fs');

function removeUploadedFile(req) {
  if (req.file && fs.existsSync(req.file.path)) {
    fs.unlink(req.file.path, () => {});
  }
}

module.exports = {
  removeUploadedFile,
};
