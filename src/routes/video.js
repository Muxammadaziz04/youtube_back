const express = require('express')
const { getVideo, postVideo } = require('../controllers/video')
const checkToken = require('../middleware/checkToken')

let router = express.Router()


router.get('/videos', getVideo)
router.post('/videoUpload', checkToken, postVideo)

module.exports =  router