const handle = require('./api/handle')
const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(bodyParser.urlencoded({ extended: false }))  
// app.use(bodyParser.json())  
app.use(function(req,res,next){
  //如果在webpack里配置了代理，那么这些响应头都不要了
  //只允许8084访问
   res.header('Access-Control-Allow-Origin','http://localhost:8084');

  //服务允许客户端发的方法
  res.header('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  //服务器允许的请求头
  res.header('Access-Control-Allow-Headers','Content-Type,Accept');
  //跨域携带cookie  允许客户端把cookie发过来
  res.header('Access-Control-Allow-Credentials','true');
  //如果请求的方法是OPTIONS,那么意味着客户端只要响应头，直接结束响应即可
  if(req.method == 'OPTIONS'){
    res.end();
  }else{
    next();
  }
});

//数据库准备工作
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog';



//存博客

app.post('/api/saveEdit', (req ,res)=> {
        handle.saveBlog(req ,res);

})

//取博客数据
app.get('/api/getblog',(req, res) => {
    handle.getBlog(req, res);
})

//获取文章
app.get('/api/getArticle', (req, res) => {
  handle.getArticle(req, res);
})
//存行博
app.post('/api/saveDailyBlog', bodyParser.json({limit: '50mb'}),(req, res) => {
  handle.saveDailyBlog(req, res);
})
//取行博
app.get('/api/getDailyBlog', (req, res) => {
  handle.getDailyBlog(req, res);
})
app.get('/api/getSingleBlog', (req, res) => {
  handle.getSingleBlog(req, res)
})
app.post('/api/saveComment', (req, res) => {
  handle.saveComment(req, res)
})
app.get('/api/getComment', (req, res) => {
  handle.getComment(req, res)
})
app.get('/api/getSortInfo', (req, res) => {
  handle.getSortInfo(req, res)
})
app.post('/api/saveMessageBoard', (req, res) => {
  handle.saveMessageBoard(req, res)
})
app.get('/api/getMessageBoard', (req, res) => {
  handle.getMessageBoard(req, res)
})
app.post('/api/saveArticleComment', (req, res) => {
  handle.saveArticleComment(req, res)
} )
var server = app.listen(8010,function() {
	console.log("success");
})

