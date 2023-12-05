import express from 'express'
import  {test, updateUserInfo} from '../controls/user-controls.js'
import { verifyUser } from '../utilites/verifyUser.js'

const router  = express.Router()

router.get("/test",test)
router.post("/:userId",verifyUser, updateUserInfo)

export default router