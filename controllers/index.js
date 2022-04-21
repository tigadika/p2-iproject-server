const { Op } = require("sequelize");

const { default: axios } = require("axios");
const { Pair, Ticker, UserPair } = require("../models/index");
const baseUrl = "https://indodax.com";
const ARIMA = require("arima");

class Controller {
  static async getPairId(req, res, next) {
    try {
      const { search } = req.query;
      let options = {
        where: {},
      };

      if (search) {
        options.where = {
          ...options.where,
          name: { [Op.iLike]: `%${search}%` },
        };
      }

      const allPair = await Pair.findAll(options);

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

  static async getAllRecord(req, res, next) {
    try {
      const { pairId } = req.params;

      const pairName = await Pair.findByPk(pairId);

      if (!pairName) throw { name: "PairNotFound" };

      const allRecords = await Ticker.findAll({
        where: {
          PairId: pairId,
        },
        include: [
          {
            model: Pair,
          },
        ],
      });

      res.status(201).json({
        data: allRecords,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getArima(req, res, next) {
    try {
      const { pairId } = req.params;

      const pairName = await Pair.findByPk(pairId);

      if (!pairName) throw { name: "PairNotFound" };

      const allRecords = await Ticker.findAll({
        where: {
          PairId: pairId,
        },
      });

      let dataArima = allRecords.map((el) => {
        return el.last;
      });

      const ts = dataArima;
      const arima = new ARIMA({
        p: 2,
        d: 1,
        q: 2,
        P: 0,
        D: 0,
        Q: 0,
        S: 0,
        verbose: false,
      }).train(ts);
      const [pred, errors] = arima.predict(5);

      res.status(201).json({
        pred,
        errors,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
