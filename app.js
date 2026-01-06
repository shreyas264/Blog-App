require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const User = require("./models/User");
const methodOverride = require("method-override")
const session =require("express-session")
const authRoutes = require("./routes/authRoutes");
const passportConfig = require("./config/passport");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");


const PORT = process.env.PORT || 3000;

//middlewares :passing form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// session middleware
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized:false,
        store: MongoStore.create({mongoUrl: process.env.MONGODB_URL, collectionName: "sessions"})
    })
)

// method override middleware
app.use(methodOverride("_method"))
// passport
passportConfig(passport)
app.use(passport.initialize());
app.use(passport.session())

// EJS
app.set("view engine", "ejs")
 
//routes
app.use("/auth", authRoutes)
app.use("/posts", postRoutes)
app.use("/", commentRoutes)
app.use("/user", userRoutes)

// home route
app.get("/", (req, res)=>{
    res.render("home", {
        user: req.user,
        error: "",
        title: "Home",
    })
})

// error handler
app.use(errorHandler)

// START server  
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
}).catch(()=>{
    console.log("Database connection failed")
})
