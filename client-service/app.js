var express = require("express");
var config = require("config");
var _ = require("lodash");

var app = express();

var port = process.env.CLIENT_SERVICE_PORT || config.get("service.port");


app.use(express.static('./public'));

// File serving endpoints
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// API access endpoints

// Start service
app.listen(port, () => {
    console.log("client-service on PORT " + port);
});