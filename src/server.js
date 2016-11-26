var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    https = require('https'),
    listRoute = require('./routes/list'),
    downloadRoute = require('./routes/download'),
    uploadRoute = require('./routes/upload'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs');


// var credentials = {
//     key: fs.readFileSync('/etc/letsencrypt/live/clementpeyrabere.net/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/clementpeyrabere.net/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/clementpeyrabere.net/chain.pem')
// }


var API_BASE_PATH = "/api/v1";
var DATABASE_NAME = "media_project";


// Connect to database
mongoose.connect("mongodb://localhost/" + DATABASE_NAME, (error) => {
    if (error) {
        console.log('Failed to connect mongod instance, please check mongodb is installed on your system and mongod instance is running on port 27017');
        console.error('Error:' + error);
    } else {
        console.log('Mongodb connection established');
    }
});

// Instantiate express server
var serverInstance = express();
serverInstance.use(cors());
serverInstance.use(bodyParser.json({ limit: '32mb' }));
serverInstance.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

serverInstance.use(express.static(path.join(__dirname, 'public')));

serverInstance.get('/mediaUpload', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
    //res.send('<html><body> <h1> It Works! </h1> </body></html>');
});

serverInstance.use('/list', listRoute);
serverInstance.use('/download', downloadRoute);
serverInstance.use('/upload', uploadRoute);

// Uncomment to enable https (not working with localhost)
//var httpsServer = https.createServer(credentials, serverInstance);

// Creating Https Server
//httpsServer.listen((process.env.PORT || 8003), () => {
serverInstance.listen((process.env.PORT || 8003), () => {
    console.info('HTTP Server Instance up & running');
});
