"use strict";

var PromiseA = require('bluebird');
var requestAsync = PromiseA.promisify(require('request'));
var express = require('express');
var jsonParser = require('body-parser').json;
var app = express();

app.use("/", function(req, res, next) {
  console.log("hello ");
  next();
});

app.use("/api", jsonParser({
    inflate: true
  , limit: '100kb'
  , strict: true
  })
);

app.post("/api/com.mailgun/send", function (req, res) {
    console.log(req.body);
    return requestAsync({
        url: "https://api.mailgun.net/v3/sandbox4d070d1dd63a471886b8ca99f19da911.mailgun.org/messages"
      , method: 'POST'
      , auth: {
          'user' : "api"
        , 'pass' : 'key-24da75e58e9f78bfcdd6a577b849dff0'
        , 'sendImmediately': true
        }
      , form: {
          "from": "Mailgun Sandbox <postmaster@sandbox4d070d1dd63a471886b8ca99f19da911.mailgun.org>"
        , "to": req.body.email
        , "subject": "You've Been Challenged!"
        , "text": "Test email"
        }
    }).then(function (resp) {
        if (200 !== resp.statusCode) {
          console.log(resp.statusCode);
          console.log(typeof resp.body, resp.body);
          return PromiseA.reject(new Error(resp.body.message));
        }

        res.send({ success: true });
    }).then(function () {}, function (error) {
        console.log(error);

        res.send({ success: false, message: error.message });
    });
});

module.exports = app;
