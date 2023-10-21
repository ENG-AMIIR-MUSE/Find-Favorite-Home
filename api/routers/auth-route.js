import express from "express";
import { signUp } from "../controls/auth-controls.js";
const authRouter = express.Router();
authRouter.post("/signUp", signUp);
export default authRouter;
