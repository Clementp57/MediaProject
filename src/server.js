var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    listRoute = require("./routes/listFileDescriptors");
    
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

serverInstance.use('/list', listRoute);

// Creating Http Server
serverInstance.listen((process.env.PORT || 80), () => {
    console.info('HTTP Server Instance up & running');
});
