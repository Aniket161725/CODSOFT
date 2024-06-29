const Listing = require("./models/listing");
const Comment = require("./models/comment.js");
const expressError = require("./utils/expressError.js");

const {listingSchema} = require("./Schema/listingSchema.js");

const {commentSchema} = require("./Schema/commentSchema.js");

module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be logged in to Create listings");
        return res.redirect("/users/login");
        
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    };
    next();
};

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listingtemp = await Listing.findById(id).populate("owner");
    if(listingtemp.owner.username != res.locals.userLog.username){
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }else {
        next();
    }
};

module.exports.commentAuthor = async(req,res,next) =>{
    let {id , commentId} = req.params;
    let commenttemp = await Comment.findById(commentId).populate("author");
    if(commenttemp.author.username != res.locals.userLog.username){
        req.flash("error" , "You are not the author of this listing");
        return res.redirect(`/listings/${id}`);
    }else {
        next();
    }
};


module.exports.validateListing = (req,res,next)=>{
    let {error} =listingSchema.validate(req.body);

    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400,errMsg); 
    }else{
        next();
    };
}

module.exports.validateComment = (req,res,next)=>{
    let {error} =commentSchema.validate(req.body);

    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        // console.log(errMsg);
        throw new expressError(400,errMsg); 
    }else{
        next();
    };
    
}