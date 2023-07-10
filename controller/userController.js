const userModel = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const createUser = async(req, res) => {
    try {
        const {userName, email, password} = req.body

        const salt = bcrypt.genSaltSync(10)
        const harsh = bcrypt.hashSync(password, salt)

        const body = {
            userName,
            email,
            password: harsh
        }

        const createdUser = await userModel.create(body)
       const token = jwt.sign(
        {
            id : createdUser._id,
        password: createdUser.password
        },
        process.env.secret,
        {
            expiresIn: "1d"
        }
        )
        createdUser.token = token
        createdUser.save()

        res.status(201).json({
            message: "user created sucessfully",
            data: createdUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const UserLogin = async(req, res) => {
    try {
        const newpassword = req.body.password
        const checkUsername = await userModel.findOne({$or: [{userName: req.body.userName},{email: req.body.email}]})

        if (!checkUsername) 
          return  res.status(400).json({
                message: "Username is not correct"
            })
        const checkPassword = bcrypt.compareSync(newpassword,checkUsername.password)
        if (!checkPassword) 
            return  res.status(400).json({
                message: "wrong password"
            })
    
            const usertoken = jwt.sign(
                {
                    id : checkUsername._id,
                password: checkUsername.password
                },
                process.env.secret,
                {
                    expiresIn: "1d"
                }
                )
                checkUsername.token = usertoken
                checkUsername.save()

                const {password, token,...alexa} = checkUsername._doc
                res.status(201).json({
                    message: "Login sucessful",
                    data: alexa
                })
           
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const OneUser = async(req, res) => {
    try {
        const id = req.params.userId
        const user = await userModel.findById(id)

        res.status(200).json({
            message: "user available",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const allUser = async(req, res) => {
    try {
        const users = await userModel.find()

        res.status(200).json({
            message: "users available are "+ users.length,
            data: users
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const Admin = async(req, res) => {
    try {
        const adminId = req.params.id
        const updateAdmin = await userModel.findByIdAndUpdate(adminId,{isAdmin: true}, {new: true})

        res.status(200).json({
            message: "admin created sucessfully",
            data: updateAdmin
        })  
    } catch (error) {
        res.status(404).json({
            message: error.message
        })  
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if (!user) {
            res.status(404).json({
                message: "unable to update user",
            }) 
        } else {
            res.status(200).json({
                message:"updated sucessfully",
                data: user
            }) 
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })    
    }
}

const deleteUser = async(req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.userId)

        if (!deleteUser) {
            res.status(404).json({
                message: "unable to delete user",
            }) 
        } else {
            res.status(200).json({
                message:"deleted sucessfully",
                data: deleteUser
            }) 
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })  
    }
}

module.exports = {
    createUser,
    UserLogin,
    OneUser,
    allUser,
    updateUser,
    deleteUser,
    Admin
}