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
        
        var filestream = fs.createReadStream(media.fullPath);
        filestream.pipe(res);
    });
  
});

/* GET /users/id */
// router.get('/:id', (req, res) => {
//     // http://mongoosejs.com/docs/api.html#model_Model.findById
//     User.findById(req.params.id, (err, user) => {
//         res.json(200, user);
//     });
// });

module.exports = router;


