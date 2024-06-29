const mongoose = require("mongoose");
// const { ref } = require("joi");
const commentSchema = new mongoose.Schema({
    comment :{
        type : String,
        // required:true,

    },
    likes :{
        type : Number,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        
    },
    author :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }
});

const Comment = mongoose.model("Comment" , commentSchema);

module.exports = Comment;