const User = require("../models/user");

const user_index = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const make_user_inactive = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      user.status = "Inactive";
      console.log(user);
      user.save();
      return res.status(200).json("The user account has been made inactive.");
    } else {
      return res.status(403);
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

const user_get_by_id = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  user_index,
  user_get_by_id,
  updateUser,
  make_user_inactive,
  deleteUser,
};
