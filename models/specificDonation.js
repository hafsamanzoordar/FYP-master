const mongoose = require("mongoose");

const specificDonationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
  },
  { timestamps: true }
);

const specificDonation = mongoose.model("specificDonation", specificDonationSchema);
module.exports = specificDonation;
