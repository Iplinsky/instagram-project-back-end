const multer = require('multer')
const path = require('path')

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, callback) {
            callback(null, file.originalname) // Primeiro padrão é dado como um erro, o segundo é registrado o nome do arquivo
        }
    })
}