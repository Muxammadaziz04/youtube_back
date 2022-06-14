const express = require('express')
const validation = require('../middleware/validation.js')
const { Register, Login, Get } = require('../controllers/users')

let router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/users', Get)


module.exports = router