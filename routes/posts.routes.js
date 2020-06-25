const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // console.log(req.params);
    res.send('We are on posts');
})
router.get('/specific', (req, res) => {
    // console.log(req.params);
    res.send('We are on posts');
})

module.exports = router;
