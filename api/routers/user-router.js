import express from 'express'
import  {test, updateUserInfo,deleteUser,getUsers} from '../controls/user-controls.js'
import { verifyUser } from '../utilites/verifyUser.js'

const router  = express.Router()

router.get("/",getUsers)
router.post("/:userId",verifyUser, updateUserInfo)
router.delete("/:userId",verifyUser, deleteUser)

export default router