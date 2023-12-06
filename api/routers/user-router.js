import express from 'express'
import  {test, updateUserInfo,deleteUser} from '../controls/user-controls.js'
import { verifyUser } from '../utilites/verifyUser.js'

const router  = express.Router()

router.get("/test",test)
router.post("/:userId",verifyUser, updateUserInfo)
router.delete("/:userId",verifyUser, deleteUser)

export default router