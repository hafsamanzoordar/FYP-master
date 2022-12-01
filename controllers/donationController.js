const Donation = require("../models/donation");
const User = require("../models/user");
const specificDonation = require("../models/specificDonation");
const janazaReq = require("../models/janazaReq");
const Request = require("../models/whiteCollarReq");

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

const getDonation = async (req, res, next) => {
  try {
      email = req.user.email;
      const user = await User.findOne({ email });
      if (user.isAdmin) {
      const reqs = await specificDonation.find();
      return res.status(200).send(reqs);
      }
      else {
      const reqs = await specificDonation.find({ email:email});
      return res.status(200).send(reqs);
      }
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const donation_create_post = async (req, res) => {
  console.log("donation recieved");
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

const janaza_donation_post = async (req, res) => {
  email = req.user.email;
  id = req.params.id;
  const janaza = await janazaReq.findById(id);
  const user = await User.findOne({ email });
  if (user) {
  console.log("donation recieved");
  const newDonation = new specificDonation(req.body);
  try {   
    const savedDonation = await newDonation.save();
    user.total = user.total + savedDonation.amount;
    user.save();
    janaza.amount = janaza.amount - savedDonation.amount;;
    janaza.save();
    res.status(200).json(savedDonation);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
}
};

const collar_donation_post = async (req, res) => {
  email = req.user.email;
  id = req.params.id;
  const collar = await Request.findById(id);
  const user = await User.findOne({ email });
  if (user) {
  console.log("donation recieved");
  const newDonation = new specificDonation(req.body);
  try {   
    const savedDonation = await newDonation.save();
    user.total = user.total + savedDonation.amount;
    user.save();
    collar.amount = collar.amount - savedDonation.amount;;
    collar.save();
    res.status(200).json(savedDonation);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
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
      return res.status(200).json("The donation has been approved.");
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const approve_specific = async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await specificDonation.findById(id);
    if (donation) {
      donation.status = "Transferred";
      console.log(donation);
      donation.save();
      return res.status(200).json("The donation has been approved.");
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
      return res.status(200).json("The donation has been declined.");
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const decline_specific = async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await specificDonation.findById(id);
    if (donation) {
      donation.status = "Not received";
      donation.save();
      return res.status(200).json("The donation has been declined.");
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
  getDonation,
  donation_create_post,
  janaza_donation_post,
  collar_donation_post,
  donation_get_by_id,
  updateDonation,
  deleteDonation,
  approve_donation,
  approve_specific,
  decline_donation,
  decline_specific
};
