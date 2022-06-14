const fs = require('fs')
const path = require('path')

function readFile(filename){
    let file = fs.readFileSync(path.join(__dirname, '../', 'database', `${filename}.json`), 'utf-8')
    return JSON.parse(file) || []
}

function writeFile( filename, data ){
    fs.writeFileSync(path.join(__dirname, '../', 'database', `${filename}.json`), JSON.stringify(data, null, 4))
}

module.exports = {readFile, writeFile}