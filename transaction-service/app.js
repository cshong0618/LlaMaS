var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");

var request = require("request");

var app = express();

var port = process.env.TRANSACTION_SERVICE_PORT || config.get("service.port");

var oauth_host = process.env.OAUTH_HOST || config.get("external-service.oauth.host");
var oauth_port = process.env.OAUTH_PORT || config.get("external-service.oauth.port");

var oauthEndpoint = "http://" + oauth_host + ":" + oauth_port + "/authorize";

app.use(bodyParser.json());

// OAuth authentication
app.use((req, res, next) => {
    request.get(oauthEndpoint, {}, (err, _res, body) => {
        if (err) {
            res.send("OAuth error.");
        } else {
            try {
                _res.body = JSON.parse(_res.body);
            } catch (ex) {
            }

            if(_res.body instanceof Object) {
                res.locals.oauthResponse = "Success";
                next('route');
            } else {
                res.send("Authorization failed");
            }
        }
    });

});

app.get("/", (req, res) => {    
    if(res.locals.oauthResponse) {
        res.send(res.locals.oauthResponse);
    }
});

app.listen(port, () => {
    console.log("transaction-service on PORT " + port);
});