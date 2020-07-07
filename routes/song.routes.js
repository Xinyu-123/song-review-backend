const express = require('express');
const Song = require('../models/song.model');
const User = require('../models/user.model');
const { db } = require('../models/song.model');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/search', async (req,res) => {
    console.log(req.query.search);
    
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Song.find({name:regex}, (err, songs) => {
            if(err){
                console.log(err);
            }

            res.json(songs);
            
        })
    }else{
        Song.find({}, (err, songs) => {
            if(err){
                console.log(err)
            }
            res.json(songs);
        })
    }
    
})

router.post('/', upload.single('song_image'),(req,res) => {
    req.body.song_image = req.file.path;
    console.log(req.body.created_by);
    // console.log('body', req.body);
    let song_created;
    User.findOne({_id: req.body.created_by}, (err, user) => {
        console.log(user);
        req.body.created_by_username = user.username;
        console.log(req.body);
        const song = new Song(req.body)
        console.log(song);
        song.save()
        .then(data => {
            console.log('saved');
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.json({err})
        })
    })
    
})

// router.get('/:songId', async (req, res) => {
//     console.log('songid');
//     // console.log(req.params.songId);
//     let song = await Song.findById(req.params.songId)
//     res.json(song);
// })


router.get('/', async (req, res) => {
    // console.log(req.params);
    let songs = await Song.find();
    // console.log(songs);
    res.json(songs);
})



router.delete('/', (req, res) => {
    db.collection('songs').remove();
    res.json('songs are removed');
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
