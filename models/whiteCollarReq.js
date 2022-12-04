const mongoose = require("mongoose");

const whiteCollarReqSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    requestFor: {
      type: String,
      required: true,
    },
    institute_name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    fCnic: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    gross_monthly_income: {
      type: String,
      required: true,
    },
    family_members: {
      type: String,
      required: true,
    },
    earning_hands: {
      type: String,
      required: true,
    },
    studying_siblings: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    total_expenditure: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const whiteCollarReq = mongoose.model("whiteCollarReq", whiteCollarReqSchema);
module.exports = whiteCollarReq;
