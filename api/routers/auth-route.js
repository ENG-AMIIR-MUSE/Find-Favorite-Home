import express from "express";
import { signIn, signUp ,google} from "../controls/auth-controls.js";
const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", google);
export default authRouter;
