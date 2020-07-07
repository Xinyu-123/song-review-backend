const express = require('express');
const bodyParser = require('body-parser');// initialize our express app
const app = express();
const songs = require('./routes/song.routes');
const users = require('./routes/user.routes');
require('dotenv/config')

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

//Middlewares
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/songs', songs);
app.use('/api/users', users)


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


