
    var express = require("express");
    var app = express();
    var fs = require("fs");
    var bodyParser = require('body-parser');  
    // parse application/x-www-form-urlencoded  
    app.use(bodyParser.urlencoded({ extended: false }))  
    // parse application/json  
    app.use(bodyParser.json())  

    //数据库准备工作
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/ok';


