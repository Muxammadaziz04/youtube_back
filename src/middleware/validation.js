const { AuthorizationError, InvalidRequestError } = require("../utils/errors.js");
const { loginSchema, registerShchema, videoSchema } = require("../utils/validation.js");



function validation(req, res, next) {

    try {

        if(req.url === '/login'){
            let {error} = loginSchema.validate(req.body)
            if(error) throw new AuthorizationError(401, error.message)
        } 
        if(req.url == '/register'){
            let { error } = registerShchema.validate(req.body)
            if(error) throw new AuthorizationError(401, error.message)
        }
        if(req.url == 'video' && req.method == "POST"){
            let {error} = videoSchema.validate(req.body)
            if(error) throw new InvalidRequestError(400, error.message)
        }
        
        next()

    } catch (error) {
        next(error)
    }

}

module.exports = validation