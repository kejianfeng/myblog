
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

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("ok");
    var myobj = { 
    	name: "是剑烽啊", 
    	age:38,
        article:'今天23.43',
        date: new Date()
    }
     dbase.collection("sit").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});

var server = app.listen(8000,function() {
	console.log("success");
})