const express = require("express");
const router = express.Router();

router.post("/", postOneBook);
router.post("/:id/rating", postRating);

router.put("/:id", putOneBook);

router.delete("/:id", deleteOneBook);

router.get("/bestrating", getBestRating);
router.get("/:id", getOneBook);
router.get("/", getAllBooks);

module.exports = router;
