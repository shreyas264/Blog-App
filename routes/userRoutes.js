const express = require("express")
const User = require("../models/User")

const { getUserProfile, getEditProfileForm, updateUserProfile, deleteUserAccount } = require("../controllers/userController")
const { ensureAuthenticated } = require("../middlewares/auth")
const upload = require("../config/multer")

const userRoutes = express.Router()



// render profile page
userRoutes.get("/profile",ensureAuthenticated , getUserProfile) 

// render edit profile page
userRoutes.post("/edit", ensureAuthenticated,upload.single('profilePicture'), updateUserProfile)

userRoutes.get("/edit", ensureAuthenticated, getEditProfileForm)

// delete user account
userRoutes.post("/delete", ensureAuthenticated, deleteUserAccount)

module.exports = userRoutes