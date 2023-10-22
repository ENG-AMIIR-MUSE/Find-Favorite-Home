import User from "../models/User-model.js";
import bycrypt from "bcryptjs";
import { errorHandler } from "../utilites/error.js";
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
