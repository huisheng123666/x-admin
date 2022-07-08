const mongoose = require('mongoose')

const schema = {
	movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        default: ''
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Number,
        default: Date.now()
    }
}

const MovieComment = mongoose.model('movieComments', mongoose.Schema(schema))

module.exports = MovieComment
