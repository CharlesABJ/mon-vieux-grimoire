const multer = require("multer");
const sharp = require("sharp");
const MIME_TYPES = {
  "   image/jpeg": "jpg",
  "   image/jpg": "jpg",
  "   image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split().join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const imageUpload = multer({ storage });

module.exports = multer({ storage }).single("image");
