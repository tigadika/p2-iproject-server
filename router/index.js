const express = require("express");
const router = express.Router();

const auth = require("./authRoutes");
const main = require("./mainRoutes");
const UserPair = require("./userPairRoutes");

router.use("/user", auth);
router.use("/main", main);
// router.use("/saved", UserPair);

module.exports = router;
