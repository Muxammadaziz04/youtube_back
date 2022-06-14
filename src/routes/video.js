const express = require('express')
const { getVideo, postVideo, view, download, getUserVideos } = require('../controllers/video')
const checkToken = require('../middleware/checkToken')

let router = express.Router()


router.post('/video', checkToken, postVideo)
router.get('/videos', getVideo)
router.get('/videos/:userId', getUserVideos)
router.get('/view/:fileName', view)
router.get('/download/:fileName', download)



module.exports =  router