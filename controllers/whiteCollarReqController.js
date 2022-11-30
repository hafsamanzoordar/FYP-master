const Request = require("../models/whiteCollarReq");
const User = require("../models/user");
const specificDonation = require("../models/specificDonation");

const whiteCollarReq_index = async (req, res, next) => {
  try {
    email = req.user.email;
    const user = await User.findOne({ email });
    if (user.isAdmin) {
      const reqs = await Request.find();
      return res.status(200).send(reqs);
    } else {
      const reqs = await Request.find({ email: email });
      res.status(200).send(reqs);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const whiteCollarReq_getApproved = async (req, res, next) => {
  try {
      const reqs = await Request.find({status: "Approved"});
      return res.status(200).send(reqs);
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const whiteCollarReq_getCleared = async (req, res, next) => {
  try {
      const reqs = await Request.find({status: "Cleared"});
      return res.status(200).send(reqs);
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const whiteCollarReq_create_post = async (req, res) => {
  const newWhiteCollarReq = new Request(req.body);

  try {
    const savedWhiteCollarReq = await newWhiteCollarReq.save();
    res.status(200).json(savedWhiteCollarReq);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
};

const specific_donation_post = async (req, res) => {
  email = req.user.email;
  const user = await User.findOne({ email });
  if (user) {
  const newDonation = new specificDonation(req.body);

  try {
    const savedDonation = await newDonation.save();
    res.status(200).json(savedDonation);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
}
};

const updatewhiteCollarReq = async (req, res, next) => {
  try {
    const updatedWhiteCollarReq = await Request.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedWhiteCollarReq);
  } catch (err) {
    next(err);
  }
};

const deletewhiteCollarReq = async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted.");
  } catch (err) {
    next(err);
  }
};

const approve_collar = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await Request.findById(id);
    if (request) {
      request.status = "Approved";
      console.log(request);
      request.save();
      return res.status(200);
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const clear_collar = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await Request.findById(id);
    if (request) {
      request.status = "Cleared";
      console.log(request);
      request.save();
      return res.status(200);
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const decline_collar = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);
    if (request) {
      request.status = "Declined";
      request.save();
      return res.status(200);
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const whiteCollarReq_get_by_id = async (req, res) => {
  try {
    const getWhiteCollarReq = await Request.findById(req.params.id);
    res.status(200).json(getWhiteCollarReq);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  whiteCollarReq_index,
  whiteCollarReq_getApproved,
  whiteCollarReq_getCleared,
  whiteCollarReq_create_post,
  specific_donation_post,
  whiteCollarReq_get_by_id,
  updatewhiteCollarReq,
  deletewhiteCollarReq,
  approve_collar,
  clear_collar,
  decline_collar,
};
