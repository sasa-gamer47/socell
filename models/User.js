const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    given_name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    locale: {
        type: String,
        // required: true
    },
    picture: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        // required: true,
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema)