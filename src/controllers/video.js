const path = require('path')
const fs = require('fs')
const { InvalidRequestError } = require('../utils/errors.js')
const { readFile, writeFile } = require('../utils/utils.js')




const postVideo = (req, res, next) => {
    
    try {
        let file = req.files.file

        if(!file) throw new InvalidRequestError(400, 'file not found')
        if(file.size > 1024 * 1024 * 50) throw new InvalidRequestError(400, 'fayl 50mb dan kop bolishi kerak emas')

        let videos = readFile('videos')
        let users = readFile('users')
        
        file.name = Date.now() + file.name.replace(/\s/g, '')
        file.mv(path.join(__dirname, '../', 'uploads', 'files', file.name))

        let user = users.find(user => user.userId == req.body.userId)
        
        delete user.password

        let video = {
            user : user,
            file : {
                view : `https://clone-you-tube.herokuapp.com/view/${file.name}`,
                download : `https://clone-you-tube.herokuapp.com/download/${file.name}`
            },
            title : req.body.title,
            date : Date.now(),
            size : file.size,
            videoId : videos.at(-1)?.videoId + 1 || 1
        }

        videos.push(video)
        writeFile('videos', videos)

        res.status(201).send({
            status: 201,
            message: 'successful added',
            data: video
        })
    } catch (error) {
        next(error)
    }

}


const getVideo = (req, res, next) => {
    try {
        let videos = readFile('videos')
        let users = readFile('users')        

        let { userId, search } = req.query

        let data = videos.filter(video => {
            let byuserId = userId ? video.user.userId == userId : true
            let bysearch = search ? video.title.toLowerCase().includes(search.toLowerCase()) : true
            return byuserId && bysearch
        })

        res.status(200).send(data)
    } catch (error) {
        return next(new InvalidRequestError(500, error.message))
    }
}

const getUserVideos = (req, res) => {
    let videos = readFile('videos')
    let { userId } = req.params

    if(!userId) return

    let data = videos.filter(video => video.user.userId == userId)

    res.status(200).send(data)
}


const view = (req, res) => {
    let { fileName } = req.params
    res.sendFile(path.join(__dirname, '../', 'uploads', 'files', fileName))
}

const download = (req, res) => {
    let { fileName } = req.params
    res.download(path.join(__dirname, '../', 'uploads', 'files', fileName))
}

module.exports = {
    getVideo,
    postVideo,
    getUserVideos,
    view,
    download
}