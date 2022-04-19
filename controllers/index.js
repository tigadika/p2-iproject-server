const { default: axios } = require("axios");
const { Pair, Ticker, UserPair } = require("../models/index");
const baseUrl = "https://indodax.com";

class Controller {
  static async getPairId(req, res, next) {
    try {
      const allPair = await Pair.findAll();

      res.status(200).json({
        data: allPair,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTicker(req, res, next) {
    try {
      const { pairId } = req.params;

      const pairName = await Pair.findByPk(pairId);

      if (!pairName) throw { name: "PairNotFound" };

      const response = await axios.get(
        baseUrl + `/api/ticker/${pairName.name}`
      );

      res.status(200).json({
        name: pairName.name,
        realTimeData: response.data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async saveRecord(req, res, next) {
    try {
      const { pairId } = req.params;
      // const { high, low, vol_idr, last, buy, sell, server_time } = req.body;

      const pairName = await Pair.findByPk(pairId);

      if (!pairName) throw { name: "PairNotFound" };

      const response = await axios.get(
        baseUrl + `/api/ticker/${pairName.name}`
      );

      const { high, low, vol_idr, last, buy, sell, server_time } =
        response.data.ticker;

      console.log(vol_idr);
      const saveRecord = await Ticker.create({
        high,
        low,
        vol_idr,
        last,
        buy,
        sell,
        server_time,
        PairId: +pairId,
      });

      res.status(201).json({
        message: "Record Saved",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
