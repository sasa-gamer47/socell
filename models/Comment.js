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
    isReply: {
        type: Boolean,
        default: false,
        required: true
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    },
})

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema)