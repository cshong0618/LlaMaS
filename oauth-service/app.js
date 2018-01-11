var config = require("config");
var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var dbConfig = config.get("mongodb");

var dbUrl = process.env.MONGO_URL || dbConfig.url;
var dbPort = process.env.MONGO_PORT || dbConfig.port;
var dbDatabase = process.env.DATABASE || dbConfig.db.oauth;

var fullPath = dbUrl + ":" + dbPort + "/" + dbDatabase;

var port = process.env.PORT || config.get("service.port");

//app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("GET");
});

app.post("/", (req, res) => {
    console.log(req);
    res.send(JSON.stringify(req.body));
});

app.get("/authorize", (req, res) => {
    res.status(501);
    res.send(JSON.stringify({message: "Not implemented"}));
});

app.listen(port, (e) => {
    console.log("Listening to " + port);
});
