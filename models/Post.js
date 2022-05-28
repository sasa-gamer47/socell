const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true,
    },
    favorites: {
        type: Number,
        default: 0,
        required: true,
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        // required: true,
    },
    userHaveLiked: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        // required: true,
    },
    userHaveFavored: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        // required: true,
    },
})

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema)