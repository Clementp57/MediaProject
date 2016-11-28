var formidable = require('formidable');
var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var Media = require('../models/Media');

router.post('/', function (req, res) {

    // if (!req.headers['x-admin'] && req.headers['x-admin'] != 'mediaprojectadmin') {
    //     res.send(401, "Not Authorized");
    //     return;
    // }

    // create an incoming form object
    var form = new formidable.IncomingForm();
    var uploads = [];

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../medias/audio');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        console.log("FILE => ", file);
        uploads.push(file);
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        uploads.forEach((upload) => {
            console.log("UPLOAD => ", upload);
            var media = new Media();
            var fileExtension = path.extname(upload.name);
            media.name = upload.name.split(fileExtension)[0];
            media.size = upload.size;
            media.mimeType = upload.type;
            media.fullPath = path.join(form.uploadDir, upload.name);

            console.log("MEDIA => ", media);

            fs.rename(upload.path, media.fullPath);
            media.save((result) => {
                console.log(result);
            });
        });


        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

module.exports = router;


