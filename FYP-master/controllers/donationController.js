const Donation = require("../models/donation");
const User = require("../models/user");

const donation_index = async (req, res, next) => {
  try {
    email = req.user.email;
    const user = await User.findOne({ email });
    if (user.isAdmin) {
      const donations = await Donation.find();
      return res.status(200).send(donations);
    } else {
      const donations = await Donation.find({ email: email });
      res.status(200).send(donations);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const donation_create_post = async (req, res) => {
  console.log("request recieved");
  const newDonation = new Donation(req.body);
  try {
    const savedDonation = await newDonation.save();
    res.status(200).json(savedDonation);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
};

const updateDonation = async (req, res, next) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDonation);
  } catch (err) {
    next(err);
  }
};

const deleteDonation = async (req, res, next) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json("Donation has been deleted.");
  } catch (err) {
    next(err);
  }
};
const approve_donation = async (req, res) => {
  try {
    const id = req.params.id;

    const donation = await Donation.findById(id);
    if (donation) {
      donation.status = "Transferred";
      console.log(donation);
      donation.save();
      return res.status(200);
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};
const decline_donation = async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await Donation.findById(id);
    if (donation) {
      donation.status = "Not received";
      donation.save();
      return res.status(200);
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const donation_get_by_id = async (req, res) => {
  try {
    const getDonation = await Donation.findById(req.params.id);
    res.status(200).json(getDonation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  donation_index,
  donation_create_post,
  donation_get_by_id,
  updateDonation,
  deleteDonation,
  approve_donation,
  decline_donation,
};
