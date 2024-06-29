const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin ,commentAuthor, validateComment} = require("../middleware.js");
const commentControllers = require("../controllers/comment.js");




//Review
//post review Route
router.post("/" ,validateComment,isLoggedin, wrapAsync(commentControllers.createComment));

//Review
//Delete Route
router.delete("/:commentId",isLoggedin,commentAuthor, wrapAsync(commentControllers.destroyComment));

module.exports = router;