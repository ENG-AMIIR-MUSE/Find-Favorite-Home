import { errorHandler } from "../utilites/error.js";
import bycrypt from "bcryptjs";

import User from "../models/User-model.js";

export const test = (req, res) => {
  res.json({ Message: "hello from controls" });
};
// functions that help the routers are called controls

export const updateUserInfo = async (req, res, next) => {
  try {
    let userId = req.params.userId;

    if (req.user.id !== userId)
      return next(errorHandler(403, "You can only update your profile"));

    if (req.body.password) {
      req.body.password = bycrypt.hashSync(req.body.password, 10);
    }
    console.log(req.body.password)
    console.log(req.body.userName)
    console.log(req.body.email)
    const update = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
      console.log("updatd",update)
    const { password, ...rest } = update._doc;
    res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
};
