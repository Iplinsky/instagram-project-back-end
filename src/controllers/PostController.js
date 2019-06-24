const Post = require('../models/Post')
const sharp = require('sharp') // redimensionamento de imagem
const path = require('path')
const fs = require('fs')  // File System


module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts)
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file
        
        const [name] = image.split('.')
        const fileName = `${name}.jpg`
        // Before create the POST -- Resize

        await sharp(req.file.path)   // Redimensionamento
            .resize(500) // Height or Width
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)  // pasta resized, e nome da imagem //
            )

        fs.unlinkSync(req.file.path) // => Método usado para deleção do arq. original após o redimensionamento
        
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        })

        // 'post' => mensagem personalizada
        req.io.emit('post', post)  // ==> Notifica todos os usuários conectados com a aplicação sobre o novo POST através do
                                  // socket.io, biblioteca para websockets, em tempo real
        return res.json(post)
    }
}