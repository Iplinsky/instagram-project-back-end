const mongoose = require('mongoose')

// PostSchema informa quais colunas estão disponíveis na tabela
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Registra data de criação / alteração
})

module.exports = mongoose.model('Post', PostSchema)