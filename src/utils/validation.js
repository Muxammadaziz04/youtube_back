const Joi = require('joi')

const registerShchema = Joi.object({
    username : Joi.string().min(2).required(),
    password : Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(8).required()
})

const videoSchema = Joi.object({
    userId : Joi.required(),
    title : Joi.string().required()
})

module.exports = {
    registerShchema,
    loginSchema,
    videoSchema
}