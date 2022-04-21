const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const Controller = require("../controllers/index");

router.use(authentication);
router.get("/pairs", Controller.getPairId);
router.get("/ticker/:pairId", Controller.getTicker);
router.post("/ticker/:pairId", Controller.saveRecord);
router.get("/records/:pairId", Controller.getAllRecord);
router.get("/arima/:pairId", Controller.getArima);

module.exports = router;
