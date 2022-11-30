const Market = require("../models/market");
const janazaReq = require("../models/janazaReq");

const market_index = async (req, res, next) => {
  try {
    const market = await Market.find();
    res.status(200).json(market);
  } catch (err) {
    next(err);
  }
};

const market_create_post = async (req, res) => {
  const newMarket = new Market(req.body);

  try {
    const savedMarket = await newMarket.save();
    res.status(200).json(savedMarket);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
};

const updateMarket = async (req, res, next) => {
  try {
    const updatedMarket = await Market.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMarket);
  } catch (err) {
    next(err);
  }
};

const getByLocation = async (req, res, next) => {
  const locations = req.query.locations.split(",");
  try {
    const list = await Promise.all(
      locations.map((location) => {
        return Market.find({ location: location });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const getByType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map((type) => {
        return Market.find({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const deleteMarket = async (req, res, next) => {
  try {
    await Market.findByIdAndDelete(req.params.id);
    res.status(200).json("Market has been deleted.");
  } catch (err) {
    next(err);
  }
};

const market_get_by_id = async (req, res) => {
  try {
    const getMarket = await Market.findById(req.params.id);
    res.status(200).json(getMarket);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  market_index,
  market_create_post,
  market_get_by_id,
  updateMarket,
  deleteMarket,
  getByLocation,
  getByType,
};
