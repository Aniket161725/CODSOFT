const Joi = require('joi');
const Comment = require("../models/comment.js");

module.exports.commentSchema = Joi.object({
    comment : Joi.object({
        likes : Joi.number().min(0),
        comment : Joi.string().required(),
    }).required(),

})