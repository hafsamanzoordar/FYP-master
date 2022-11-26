const janazaReq = require("../models/janazaReq");
const User = require("../models/user");

const janazaReq_index = async (req, res, next) => {
  try {
    email = req.user.email;
    const user = await User.findOne({ email });
    if (user.isAdmin) {
      const reqs = await janazaReq.find();
      return res.status(200).send(reqs);
    } else {
      const reqs = await janazaReq.find({ email: email });
      res.status(200).send(reqs);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const janazaReq_getApproved = async (req, res, next) => {
  try {
      const reqs = await janazaReq.find({status: "Approved"});
      return res.status(200).send(reqs);
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const janazaReq_getCleared = async (req, res, next) => {
  try {
      const reqs = await janazaReq.find({status: "Cleared"});
      return res.status(200).send(reqs);
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const janazaReq_getDonated = async (req, res, next) => {
  try {
      email = req.user.email;
      const user = await User.findOne({ email });
      if (!user.isAdmin) {
      const reqs = await janazaReq.find({status: "Donated", email:email});
      return res.status(200).send(reqs);
      }
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

const janazaReq_create_post = async (req, res) => {
  const newJanazaReq = new janazaReq(req.body);

  try {
    const savedJanazaReq = await newJanazaReq.save();
    res.status(200).json(savedJanazaReq);
  } catch {
    (err) => {
      res.status(500).json(err);
      console.log(err);
    };
  }
};

const updatejanazaReq = async (req, res, next) => {
  try {
    const updatedJanazaReq = await janazaReq.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedJanazaReq);
  } catch (err) {
    next(err);
  }
};

const deletejanazaReq = async (req, res, next) => {
  try {
    await janazaReq.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted.");
  } catch (err) {
    next(err);
  }
};

const approve_janaza = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await janazaReq.findById(id);
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

const donate_janaza = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await janazaReq.findById(id);
    if (request) {
      request.status = "Donated";
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

const clear_janaza = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await janazaReq.findById(id);
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

const decline_janaza = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await janazaReq.findById(id);
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

const janazaReq_get_by_id = async (req, res) => {
  try {
    const getJanazaReq = await janazaReq.findById(req.params.id);
    res.status(200).json(getJanazaReq);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  janazaReq_index,
  janazaReq_getApproved,
  janazaReq_getCleared,
  janazaReq_getDonated,
  janazaReq_create_post,
  janazaReq_get_by_id,
  updatejanazaReq,
  deletejanazaReq,
  approve_janaza,
  donate_janaza,
  clear_janaza,
  decline_janaza
};
