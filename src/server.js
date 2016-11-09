var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    fs = require('fs');
var Promise = require("bluebird");

var API_BASE_PATH = "/api/v1";

// Connecting to databases
var serverInstance = express();

serverInstance.use(cors());

serverInstance.use(bodyParser.json({ limit: '32mb' })); // support json encoded bodies
serverInstance.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
})); // support encoded bodies

serverInstance.get('/', (req, res) => {
    res.send('<html><body>Hello from Node.js container </body></html>');
});


// Routes : TODO => put in separate file
serverInstance.get('/listAudio', (req, res) => {
    var path = "../medias/audio";
    var fileDescriptors = [];
    fs.readdir(path, function (err, items) {
        if (err) {
            console.log(err);
            return;
        }
        for (var i = 0; i < items.length; i++) {
            var file = path + '/' + items[i];
            console.log("Start: " + file);

            fs.stat(file, function (err, stats) {
                console.log(stats['size']);
            });
        }
    });
});

serverInstance.get('/listVideo', (req, res) => {
    var path = "../medias/video";
    getFileDescriptorsForPath(path).then((fileDescriptors) => {
        res.status(200).json(fileDescriptors);
    });
});

var getFileStats = (file) => {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

var getFileDescriptorsForPath = (path) => {
    return new Promise((resolve, reject) => {
        var fileDescriptors = [];
        fs.readdir(path, function (err, items) {
            var promiseChain = Promise.resolve(null);
            for (var i = 0; i < items.length; i++) {
                var file = path + '/' + items[i];
                var fileName = items[i];
                promiseChain = promiseChain.bind(fileName).then(() => {
                    return getFileStats(file).then((stats) => {
                        var size = stats["size"];
                        fileDescriptors.push({
                            fileName: fileName,
                            fileSize: size
                        });
                    });
                });
            }
            promiseChain.then(() => {
                resolve(fileDescriptors);
            });
        });
    });
}

// Creating Http Server
serverInstance.listen((process.env.PORT || 80), () => {
    console.info('HTTP Server Instance up & running');
});
