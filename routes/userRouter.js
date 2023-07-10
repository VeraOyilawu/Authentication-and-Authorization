const express = require("express")
const router = express.Router()
const {createUser, UserLogin, allUser, Admin, OneUser, updateUser, deleteUser } = require('../controller/userController')
const {checkUser} = require("../controller/autorization")
const { updateOne } = require("../model/userModel")

router.route("/").get((req, res) => {
    res.json("Welcome user to my authentication Homepage")
})
router.route("/signUp").post(createUser)
router.route("/login").post(UserLogin)
router.route("/allUsers").get(allUser)
router.route("/:id/user/:userId").get(checkUser,OneUser).patch(checkUser,updateUser).delete(checkUser, deleteUser)
router.route("/:id/admin").patch(Admin)



module.exports = router