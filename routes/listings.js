const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({ storage });
const {isLoggedin , isOwner} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");


// router.get("/" , (req,res)=>{
//     res.render("listings/index.ejs");
// });

//new Route
router.get("/new" 
    ,isLoggedin
    ,listingControllers.new);

//Gerne Route
router.get("/top/:gerne" ,listingControllers.gerne );

//Search Route
router.get("/search" ,listingControllers.search );

//home Route
//Create Route
router.route("/")
.get(wrapAsync(listingControllers.index))   
.post(   
    isLoggedin,
    upload.single('listing[image]'),
    wrapAsync(listingControllers.create)
);

//show Route
//update Route
//Delete Route
router.route("/:id")
.get(wrapAsync(listingControllers.show))
.put(
    isLoggedin,
    isOwner, 
    upload.single('listing[image]'),
    wrapAsync(listingControllers.update)
)
.delete(
    isOwner, 
    wrapAsync(listingControllers.destroy)
);


router.get(
    "/:id/edit" ,
    isLoggedin,
    isOwner, 
    wrapAsync(listingControllers.edit)
);






module.exports = router;