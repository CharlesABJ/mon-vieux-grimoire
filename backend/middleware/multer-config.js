const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const { log } = require("console");

//Créer une instance de memoryStorage pour stocker temporairement les fichiers téléchargés en mémoire vive
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const improveImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      res.status(400).json({ error });
    }
    const timestamp = Date.now();

    if (req.file) {
      const name = `images/${timestamp}-${req.file.originalname.split(" ").join("-").split(".")[0]}.webp`
      const imageBuffer = req.file.buffer;

      sharp(imageBuffer)
        // .resize()
        .webp({ quality: 80 })
        .toFile(name, (err, info) => {
          if (err) {
            // Supprimer l'image non compressée en cas d'erreur
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ error });
          }

          next();
        });
    } else {
      next();
    }
  });
};

module.exports = improveImage;
