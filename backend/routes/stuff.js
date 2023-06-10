const express = require("express");
const auth = require("../middleware/auth");
const stuffCtrl = require("../controllers/stuff");
const multer = require("../middleware/multer-config");
const router = express.Router();

router.post("/", auth, multer, stuffCtrl.postOneBook);
router.post("/:id/rating", auth, multer, stuffCtrl.postRating);

router.put("/:id", auth, multer, stuffCtrl.putOneBook);

router.delete("/:id", auth, multer, stuffCtrl.deleteOneBook);

router.get("/bestrating", stuffCtrl.getBestRating);
router.get("/:id", stuffCtrl.getOneBook);
router.get("/", stuffCtrl.getAllBooks);

module.exports = router;
