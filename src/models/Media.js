var mongoose = require('mongoose');

var Media = new mongoose.Schema({
    name: String,
    size: Number,
    type: String,
    mimeType: String,
    fullPath: String
});

module.exports = mongoose.model('Media', Media);
