const express = require("express")
const User = require("../models/User")
const { getLogin, login, getRegister, register, logout } = require("../controllers/authController")
const authRoutes = express.Router()



// render login page
authRoutes.get("/login", getLogin) 

// main logic for user login
authRoutes.post("/login", login) 

// render register page
authRoutes.get("/register", getRegister ) 

// main login for user register
authRoutes.post("/register", register)

// logout
authRoutes.get("/logout", logout)

module.exports = authRoutes