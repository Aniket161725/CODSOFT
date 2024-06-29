const express = require("express");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userControllers = require("../controllers/user.js");

//signup Route
//signup Post User Route
router.route("/signup")
.get(userControllers.signUp )
.post(userControllers.signUpPost);



router.get("/profile/posts" ,userControllers.post );

router.get("/profile/comments" ,userControllers.comment );


//login Route
//login Post User Route
router.route("/login")
.get(userControllers.login )
.post(saveRedirectUrl,
    passport.authenticate('local' , {
        failureRedirect:"/users/login",
        failureFlash : true,
    }),
    userControllers.loginPost 
    );

//logout
router.get("/logout" ,userControllers.logout );

module.exports = router;