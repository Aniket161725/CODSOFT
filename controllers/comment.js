const express = require("express");
const Listing = require("../models/listing.js");
const Comment = require("../models/comment.js");


module.exports.createComment = async (req,res)=>{
    // let listing = req.body.listings;
    // if(!req.body.Listing){
    //    throw new expressError(404,"Send valid Data!"); 
    // };
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newComment = new Comment(req.body.comment);
    newComment.author = req.user._id;
    console.log(newComment);

    listing.comments.push(newComment);
    await newComment.save();
    await listing.save();

    req.flash("success" , "New Comment Created..");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyComment = async (req,res)=>{
    let {id , commentId} = req.params;
    console.log(id , commentId); 
    await Listing.findByIdAndUpdate(id , {$pull: {comments : commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash("success" , "Comment Deleted!!");
    res.redirect(`/listings/${id}`);
};