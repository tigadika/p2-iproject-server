const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const UserPairController = require("../controllers/userPairController");

router.use(authentication);
router.get("/pair", UserPairController.getBookmark);
router.post("/pair/:pairId", UserPairController.addBookmark);
router.post("/pair/:tableId", UserPairController.removeBookmark);

module.exports = router;
