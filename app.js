
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const mongoose_Url = 'mongodb://127.0.0.1:27017/bloggingWeb';
const ejsMate = require("ejs-mate");

app.set("views" , path.join(__dirname,"/views"));
app.set("view engine" , "ejs");

app.use(express.static(path.join(__dirname , "/public")));
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

const listingsRouter = require("./routes/listings.js");
const commentRouter = require("./routes/comment.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const User = require("./models/user.js");

main().then(()=>{
    console.log("connected to dataBase");
}).catch((err) =>{
    console.log(err);
});


async function main() {
    await mongoose.connect(mongoose_Url);
};
const store = MongoStore.create({
    mongoUrl:mongoose_Url,
    crypto :{
        secret : process.env.secret,
    },
    touchAfter : 24 * 3600,
})

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE " , err)
} )


const sessionOptions = {
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie :{
        expire : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.userLog = req.user;
    next();
});



app.use("/listings" , listingsRouter);
app.use("/listings/:id/comments" , commentRouter);
app.use("/users" , userRouter);


app.listen(port , ()=>{
    console.log("Server is listening to port 8080");
});
