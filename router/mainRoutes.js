const express = require("express");
const router = express.Router();

const Controller = require("../controllers/index");

router.get("/pairs", Controller.getPairId);
router.get("/ticker/:pairId", Controller.getTicker);
router.post("/ticker/:pairId", Controller.saveRecord);

module.exports = router;
