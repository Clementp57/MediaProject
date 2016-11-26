var express = require('express');
var router = express.Router();
var fsHelper = require("../helpers/fsHelper");
var path = require("path");
var Media = require('../models/Media');
var fs = require('fs');

router.get('/audio/:id', (req, res) => {

    Media.findById(req.params.id, (err, media) => {
        console.log(media, err); 

        res.setHeader('Content-disposition', 'attachment; filename=' + media.name + "." + media.mimeType.split("/")[1]);
        res.setHeader('Content-type', media.mimeType);
        res.setHeader('Content-length', media.size);
        
        var filestream = fs.createReadStream(media.fullPath);
        filestream.pipe(res);
    });
  
});

router.get('/video/:id', (req, res) => {

    Media.findById(req.params.id, (err, media) => {
        console.log(media, err); 

        res.setHeader('Content-disposition', 'attachment; filename=' + media.name + "." + media.mimeType.split("/")[1]);
        res.setHeader('Content-type', media.mimeType);
        res.setHeader('Content-length', media.size);
        
        var filestream = fs.createReadStream(media.fullPath);
        filestream.pipe(res);
    });
  
});

module.exports = router;


