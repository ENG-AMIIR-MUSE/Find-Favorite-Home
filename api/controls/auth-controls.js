import User from "../models/User-model.js";
import bycrypt from "bcryptjs";
import { errorHandler } from "../utilites/error.js";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  console.log(req.body);

  //  hasySync :takes two arg , pass , no Of hasshing
  try {
    const { userName, email, password } = req.body; // req.body have the information that we send
    const hashedPassword = bycrypt.hashSync(password, 10); // hashSync already is using the await so we don't need to  write await
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save(); // it takes some tiems depending on you internet  so make it await
    return res.status(201).json({ Message: "user created Successfully" }); // 201 means something created
  } catch (error) {
    next(error);
  }
};

// create login api

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("in the method ", req.body);
    let validUser = await User.findOne({ email });
    console.log("Valid User");

    if (!validUser) {
      return next(errorHandler(404, "user not Found"));
    }
    let validPassword = bycrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Password"));
    }
    console.log(validUser);
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

// google auth

export const google = async (req, res,next) => {
  const { userName, email, avatar } = req.body;
  // check if user exists

  try {
    const validUser = await User.findOne({ email });
    if (validUser) {
      console.log("in the IF block....")

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const {password:pass,...rest}  = validUser._doc
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // generate a password for the user
      console.log("in the else block....")
      const newPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // hash the password
      const hashedPass = bycrypt.hashSync(newPass, 10);
      // create a new user with the data from google and the generated password
      const newUser = new User({
        userName,
        email,
        password:hashedPass,
        avatar,
      });
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const {password, ...rest} = newUser._doc
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
