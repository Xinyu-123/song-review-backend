const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const Schema = mongoose.Schema;

let date = new Date();

const SongSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: false
    },
    artist: {
        type:String,
        required: true
    },
    date_published: {
        type: Date,
        required: false
    },
    date_uploaded: {
        type: Date, 
        default: date
    },

    song_image: {
        type: String,
        required: false
    },

    rating: {
        type: Number,
        default: 0
    },

    created_by: {
        type: ObjectID,
        required: true
    },

    created_by_username: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Song', SongSchema, 'songs');