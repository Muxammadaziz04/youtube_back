
class AuthorizationError extends Error{
    constructor(status, message){
        super()
        this.status = status,
        this.message = message
    }
}

class InvalidRequestError extends Error{
    constructor(status, message){
        super()
        this.status = status,
        this.message = message
    }
}

module.exports = { AuthorizationError, InvalidRequestError }