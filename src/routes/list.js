var express = require('express');
var router = express.Router();
var fsHelper = require("../helpers/fsHelper");
var path = require("path");
var Media = require('../models/Media');

router.get('/video', (req, res) => {
    var videoPath = path.resolve("medias/video");
    fsHelper.getFileDescriptorsForPath(videoPath).then((fileDescriptors) => {
        res.status(200).json(fileDescriptors);
    });
});

router.get('/audio', (req, res) => {
    Media.find({ mimeType: "audio/mp3"  }, (err, files) => {
        res.status(200).json(files);
    });

    // var audioPath = path.resolve("medias/audio");
    // fsHelper.getFileDescriptorsForPath(audioPath).then((fileDescriptors) => {
    //     res.status(200).json(fileDescriptors);
    // });
});

module.exports = router;


