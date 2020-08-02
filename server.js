const express = require('express');
const bodyParser = require('body-parser');// initialize our express app
const app = express();
const songs = require('./routes/song.routes');
const users = require('./routes/user.routes');
const reviews = require('./routes/review.routes');
require('dotenv/config')

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://xdong82:3bAkrvlTsXCHWqVD@cluster0-pxsle.mongodb.net/Music2?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const router = express.Router();
//Middlewares
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/songs', songs);
app.use('/api/users', users);
app.use('/api/reviews', reviews);


const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


