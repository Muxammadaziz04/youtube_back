const express = require('express')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const validation = require('./middleware/validation')
const videoRoute = require('./routes/video.js')
const userRoute = require('./routes/user.js')

let app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(validation)
app.use(express.static(path.join(__dirname, 'uploads')))


app.use(userRoute)
app.use(videoRoute)




app.use((err, req, res, next) => {
    if(err.status >= 400 && err.status < 500){
       return res.status(err.status).send({
            status : err.status,
            message: err.message
        })
    }  

    res.status(500).send({
        status: 500,
        message: err.message
    })
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is runing on ${PORT} port`))