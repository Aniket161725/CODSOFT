const mongoose = require("mongoose");
const Comment = require("./comment.js");
// const { ref } = require("joi");

const listingSchema = new mongoose.Schema({
    title :{
        type : String,
        // required:true,

    },
    description : {
        type : String,
        
    },
    image:{
        url : String,
        filename : String,
    },
    comments :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }
    ],
    owner :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    category :{
        type:String,
        enum : [
            'Programming',
            'Travel',
            'Design',
            'Social-Media',
            'Technology',
            'Lifestyle',
            'Writing',
            'Cooking',
            'Animation',  
        ],
    }
});


const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;