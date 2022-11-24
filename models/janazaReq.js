const mongoose = require("mongoose");

const janazaReqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    dName: {
      type: String,
      required: true,
    },
    dCnic: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    deathDate: {
      type: Date,
    },
    address: {
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

const janazaReq = mongoose.model("janazaReq", janazaReqSchema);
module.exports = janazaReq;
