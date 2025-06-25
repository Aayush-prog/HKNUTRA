const fs = require("fs");
const path = require("path");

function deleteFile(fileName) {
  if (!fileName) return;

  const imagePath = path.join(__dirname, "..", "public", "files", fileName);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log(`File "${fileName}" deleted successfully`);
    }
  });
}

module.exports = deleteFile;
