const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
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
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        required: true,
    }, // idk if'll need this
    repliesCount: {
        type: Number,
        default: 0,
        required: true,
    },
    favorites: {
        type: Number,
        default: 0,
        required: true,
    },
    isReply: {
        type: Boolean,
        default: false,
        required: true
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    }, // maybe I want use this
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
    userHaveReplied: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

})

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema)