const Donation = require("../models/donation");
const janazaReq = require("../models/janazaReq");

const members = async (req, res, next) => {
  const goldMembers = await Donation.aggregate([
    {
      $group: {
        _id: "$email",
        total: { $sum: "$amount" },
      },
    },
    {
      $match: { total: { $gte: 100000 } },
    },
  ]);
  const silverMembers = await Donation.aggregate([
    {
      $group: {
        _id: "$email",
        total: { $sum: "$amount" },
      },
    },
    {
      $match: { total: { $gte: 50000, $lt: 100000 } },
    },
  ]);
  const bronzeMembers = await Donation.aggregate([
    {
      $group: {
        _id: "$email",
        total: { $sum: "$amount" },
      },
    },
    {
      $match: { total: { $gte: 25000, $lt: 50000 } },
    },
  ]);
  res.send({ goldMembers, bronzeMembers, silverMembers });
};

module.exports = { members };
