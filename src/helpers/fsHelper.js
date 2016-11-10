'use strict';

var fs = require('fs'),
    Promise = require("bluebird");

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
        fs.readdir(path, function (error, items) {
            if (error) {
                console.log('Error = ', error);
                reject(error)
            } else {
                var promiseChain = Promise.resolve(null);
                for (var i = 0; i < items.length; i++) {
                    let file = path + '/' + items[i];
                    let fileName = items[i];
                    promiseChain = promiseChain.bind(fileName).then(() => {
                        return getFileStats(file).then((stats) => {
                            var size = stats["size"];
                            console.log(fileName, size);
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
            }

        });
    });
}

module.exports = {
    getFileStats: getFileStats,
    getFileDescriptorsForPath: getFileDescriptorsForPath
}