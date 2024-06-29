const Joi = require('joi');
const Listing = require('../models/listing');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.string().allow("" , null),
        category : Joi.string().required(),
    }).required(),
});

