const express = require('express')
const validation = require('../middleware/validation.js')
const { Register, Login } = require('../controllers/authorization')

let router = express.Router()

router.post('/register', Register)
router.post('/login', Login)


module.exports = router