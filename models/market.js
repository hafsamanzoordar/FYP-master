const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Market = mongoose.model("Market", marketSchema);
module.exports = Market;
