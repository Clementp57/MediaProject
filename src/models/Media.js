var mongoose = require('mongoose');

var Media = new mongoose.Schema({
    name: String,
    fullPath: String,
    weight: Number
});

module.exports = mongoose.model('Media', Media);
