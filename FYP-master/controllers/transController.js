const Transacion = require("../models/transaction");

const trans_create_post = async (req, res) => {
  console.log("request recieved");
  const newTransaction = new Transacion(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
};

module.exports = {
  trans_create_post,
};
