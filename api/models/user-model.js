import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QZlJJD94rwfUyd2urVidUI0XoGxvb0jd9Jx-ugesXQ&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
