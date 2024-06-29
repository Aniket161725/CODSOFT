const express = require("express");
const Listing = require("../models/listing.js");


module.exports.new = (req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.gerne =async (req,res)=>{

    let {gerne} = req.params;
    let allData =await Listing.find({category : gerne});
    res.render("listings/index.ejs", {allData});
};

module.exports.search = async(req,res) =>{
    let data = req.query;
    let allData =await Listing.find({category : data.gerne});
    // console.log(data.places);
    res.render("listings/index.ejs", {allData});
    // search?places=aniket
}



module.exports.create = async (req,res)=>{
    console.log(req.file)
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = new Listing(req.body.listing);
    // console.log(listing);


    listing.owner = req.user._id;
    listing.image = {url ,filename};

    await listing.save();
    // console.log(listing);
    req.flash("success" , "New Listing Created!!");
    res.redirect("/listings");
};

module.exports.index = async (req,res)=>{
    let places = req.query;
    // console.log(places);
    let allData =await Listing.find().
    populate({
        path : "owner" , 
        populate :{
            path : "username"
        },
    })
    // console.log(allData);
    res.render("listings/index.ejs" , {allData});
};

module.exports.edit = async (req,res)=>{
    let {id} = req.params;
    let listing =await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload/" , "/upload/h_200,w_250/");

    res.render("listings/edit.ejs",{listing , originalImageUrl});
};

module.exports.update = async (req,res)=>{
    let {id} = req.params;
    let listinged = await Listing.findByIdAndUpdate(id ,{...req.body.listing});
    // if(!req.body.Listing){
    //     throw new expressError(404,"Send valid Data!"); 
    // };
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listinged.image = {url ,filename};
        await listinged.save();
    };
    req.flash("success" , "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.show = async (req,res)=>{
    let {id} = req.params;
    let singleData =await Listing.findById(id).
    populate({
        path : "comments" , 
        populate :{
            path : "author"
        },
    })
    .populate("owner");

    console.log(singleData);
    if(!singleData){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings");

    }

    // console.log(singleData.reviews.author );
    res.render("listings/show.ejs",{singleData});
};

module.exports.destroy = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted!!");
    res.redirect(`/listings`);
};