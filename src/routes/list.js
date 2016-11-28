var express = require('express');
var router = express.Router();
var fsHelper = require("../helpers/fsHelper");
var path = require("path");
var Media = require('../models/Media');

router.get('/video', (req, res) => {
    Media.find({ mimeType: { $in : ["video/mp4", "video/quicktime"]}  }, (err, files) => {
        res.status(200).json(files);
    });
});

router.get('/audio', (req, res) => {
    Media.find({ mimeType: "audio/mp3"  }, (err, files) => {
        res.status(200).json(files);
    });
});

module.exports = router;


