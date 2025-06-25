const fs = require("fs");
const path = require("path");

function deleteImage(imageName) {
  if (!imageName) return;

  const imagePath = path.join(__dirname, "..", "public", "images", imageName);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
    } else {
      console.log(`Image "${imageName}" deleted successfully`);
    }
  });
}

module.exports = deleteImage;
