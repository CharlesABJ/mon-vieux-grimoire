const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const improveImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      res.status(400).json({ error });
    }
    const timestamp = Date.now();

    if (req.file) {
      const name = `images/${timestamp}-${req.file.originalname.split(".")[0]}.webp`
      const imageBuffer = req.file.buffer;

      sharp(imageBuffer)
        .webp({ quality: 80 })
        .toFile(name, (err, info) => {
          if (err) {
            // Supprimer l'image non compressée en cas d'erreur
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ error: err.message });
          }

          // Supprimer l'image non compressée
          fs.unlinkSync(req.file.path);
          req.file.buffer = null;
          req.file.name = name;
          next();
        });
    } else {
      next();
    }
  });
};

module.exports = improveImage;
