const express = require("express");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const Comment = require("../models/comment.js");


module.exports.signUp = (req,res)=>{
    res.render("users/signup.ejs");

};

module.exports.post = async(req,res)=>{    
    let id = (req.user._id)
    let username = (req.user.username);
    console.log(req.user);
    let allData =await Listing.find({owner : id});
    res.render("users/profile.ejs", {allData , username });
}

module.exports.comment = async(req,res)=>{    
    let id = (req.user._id)
    let username = (req.user.username);

    let allData =await Comment.find({author : id}).
    populate({
        path : "author" 
    });

    let singleData =await Listing.findById(id).
    populate({
        path : "comments" , 
        populate :{
            path : "author"
        },
    })
    .populate("owner");

    res.render("users/comments.ejs", {allData , singleData, username});

}


module.exports.signUpPost = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({username , email});
        const registeruser = await User.register(newUser , password);
        console.log(registeruser);
        req.login(registeruser , (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" , "User is registered");
            res.redirect("/listings");

        });
    }catch(err){
        req.flash("error" , err.message);
        res.redirect("/users/signup");
    }
};

module.exports.login   = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginPost   = async(req,res)=>{
    req.flash("success" , "Welcome to HeavenlyEarth");
    const redirectUrl  = res.locals.redirectUrl ||  '/listings'
    res.redirect(redirectUrl);
};

module.exports.logout   = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success" , "you are Logged Out");
        res.redirect("/listings");
    })
};