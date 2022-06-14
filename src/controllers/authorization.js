const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { readFile, writeFile } = require('../utils/utils.js')

const secretKey = 'secret'


const Register = (req, res) => {
    let body = req.body
    let file = req.files
    let users = readFile('users')


    if(file){
        let fileName = Date.now() + file.img.name.replace(/\s/g, "")
        file.img.mv(path.join(__dirname, '../', 'uploads', 'ava', fileName))
        body.avatar = `http://localhost:3000/ava/${fileName}`
    } else {
        body.avatar = "http://localhost:3000/ava/simple.jpg"
    }
    
    body.userId = users.length ? +users.at(-1).userId + 1 : 1
    body.password = sha256(body.password)

    users.push(body)
    writeFile('users', users)

    delete body.password

    res.status(201).send({
        status : 201,
        message: 'successful registered',
        token : jwt.sign({
            userId : body.userId
        }, secretKey),
        user : body
    })

}


const Login = (req, res, next) => {

    try {

        let body = req.body
        let users = readFile('users')

        let user = users.find(user => user.username == body.username && user.password == sha256(body.password))

        if(!user) throw new AuthorizationError(401, 'wrong username or password')


        delete user.password

        res.status(200).send({
            status : 200,
            message : 'successful logined',
            token : jwt.sign({ userId : user.userId }, secretKey),
            user : user
        })
        
    } catch (error) {
        next(error)
    }

}



module.exports = {
    Register,
    Login
}