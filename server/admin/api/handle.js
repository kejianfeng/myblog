
const computed =  require('./computed') ;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog';

module.exports =  {

    saveBlog(req, res) {
        const id = computed.random();
        const originDate = (new Date()).toLocaleDateString(); //时间戳
        var article = Object.assign({}, req.body[0], {
            originDate,
            id
        })
        var articleContent = Object.assign({}, req.body[1], {
            originDate,
            id
        })

        // console.log(blog)
        res.json({status:0, info:'sucess'})
        //存文章信息，表article
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                // console.log('数据库已创建');
                var dbase = db.db("blog");
                dbase.collection("article").insertOne(article, (err, response) => {
                    if (err) throw err;
                    console.log("文档插入成功");
                    db.close();
                });
        });
        //存文章内容，表articleContent
        MongoClient.connect(url, {useNewUrlParser: true }, (err, db) => {
            var blog = req.body[1];
            if (err) {
                throw err;
            }
            var dbase = db.db("blog");
            dbase.collection('articleContent').insertOne(articleContent, (err, response) => {
                if (err) {
                    throw err;
                }
                console.log("文章插入成功");
                db.close();
            })

        } )
    
    },

    getBlog(req, res) {
        var results;
        MongoClient.connect(url, { useNewUrlParser: true },(err, db) => {
                    if (err) throw err;
                    var dbase = db.db('blog');
                    dbase.collection("article").find({}).toArray((err_, result) => {
                        if (err_) throw err_;
                        results = result;
                         res.json(results);
                        db.close();
                    }) 
        })
    },

    getArticle(req, res) {
        var key = {'id': req.query.id};
        MongoClient.connect(url, { useNewUrlParser: true },(err, db) => {
            if(err) {
                throw err;
            }
            var dbase = db.db('blog');
            dbase.collection('articleContent').find(key).toArray((err, result) => {
                if(err) throw err;
                dbase.collection('ArticleComment').find(key).toArray((er,comment) => {
                    if(er) {throw er}
                    res.json({
                        articleContent:result,
                        articleComment:comment
                    });
                })
                dbase.collection('article').find(key).toArray((err, result_) => {
                    var reading = result_[0].reading
                    var newReading =  reading + 1;
                    // console.log(result_[0])
                    var updateReading = {$set: {'reading': newReading}};
                    dbase.collection('article').updateOne(key, updateReading, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        db.close();
                    })
                })
                
            })
        } )
    },

    saveDailyBlog(req, res) {
        const blog_ = req.body;
        const date = new Date();
        const id = computed.random();
        const blog = Object.assign({}, blog_, {
            date,
            id,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()

        })
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
            else {
                var dbase = db.db('blog');
                dbase.collection('dailyBlog').insertOne(blog, (err, response) => {
                    console.log("插入行博成功");
                    db.close();
                })
            }
        } )
    },
    getDailyBlog(req, res) {
        var results;
        MongoClient.connect(url, { useNewUrlParser: true },(err, db) => {
                    if (err) throw err;
                    var dbase = db.db('blog');
                    dbase.collection("dailyBlog").find({}).toArray((err_, result) => {
                        if (err_) throw err_;
                        results = result;
                         res.json(results);
                        db.close();
                    }) 
        })
    },
    getSingleBlog(req, res) {
        console.log(req.query);
        var key = {'id': req.query.id};
        let reading = 0;
        MongoClient.connect(url, { useNewUrlParser: true },(err, db) => {
            if(err) {
                throw err;
            }
            var dbase = db.db('blog');

            dbase.collection('dailyBlog').find(key).toArray((err, result) => {
                if(err) throw err;
                console.log(1)
                reading = result[0].reading;
                res.json(result);
                // db.close();
                let newReading = reading + 1;
                console.log(2)
                var updateReading = {$set: {'reading': newReading}};
                dbase.collection('dailyBlog').updateOne(key, updateReading, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log("更新文档成功");
                    db.close();
                })
            })
        } )
    },
    saveComment(req, res) {
        const comment_ = req.body;
        const date_ = new Date();
        const date = date_.toLocaleDateString();
        const time = date_.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]; //截取时间点
        const comment = Object.assign({}, comment_, {
            date,
            time
        })
        var key = {'id': req.body.id};
        var review = 0;
        res.json({status:0, info:'sucess'})
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
            else {
                var dbase = db.db('blog');
                dbase.collection('dailyBlogComment').insertOne(comment, (err_, response) => {
                    if (err_) {
                        throw err_;
                    }
                    console.log("插入评论成功");
                })
                dbase.collection('dailyBlog').find(key).toArray((err, result) => {
                    if(err) throw err;
                    review = result[0].review
                // db.close();
                    var newReview =  parseInt(review) + 1;
                    var updateReview = {$set: {'review': newReview}};
                    dbase.collection('dailyBlog').updateOne(key, updateReview, (err_, result) => {
                        if (err_) {
                            throw err_;
                        }
                        console.log("更新文档成功");
                        db.close();
                    })
                })
            }
        } )

    },
    getComment(req, res) {
        var key = {'id': req.query.id};
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
            
            var dbase = db.db('blog');
            dbase.collection('dailyBlogComment').find(key).toArray((err_, result) => {
                if(err_) throw err_;
                else{
                    res.json(result);
                }
            })
        })
    },
    getSortInfo(req, res) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
           
            var dbase = db.db('blog');
            dbase.collection('article').find().toArray((err_, result) => {
                if(err_) throw err_;
                res.json(result);
            })
        
        })
    },
    saveMessageBoard(req, res) {
        const comment_ = req.body;
        const date_ = new Date();
        const date = date_.toLocaleDateString();
        const time = date_.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]; //截取时间点
        const comment = Object.assign({}, comment_, {
            date,
            time,
        })
        // var key = {'id': req.body.id};
        // var review = 0;
        res.json({status:0, info:'sucess'})
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
            var dbase = db.db('blog');
            dbase.collection(req.body.saveCollection).insertOne(comment, (err_, response) => {
                if (err_) {
                    throw err_;
                }
                console.log("插入留言板评论成功");
                db.close();
            })
        
        } )

    },
    getMessageBoard(req, res) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
           
            var dbase = db.db('blog');
            dbase.collection('messageBoard').find().toArray((err_, result) => {
                if(err_) throw err_;
                res.json(result);
            })
        
        })
    },
    saveArticleComment(req, res) {
        const comment_ = req.body;
        const date_ = new Date();
        const date = date_.toLocaleDateString();
        const time = date_.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]; //截取时间点
        const comment = Object.assign({}, comment_, {
            date,
            time,
        })
        // var key = {'id': req.body.id};
        // var review = 0;
        res.json({status:0, info:'sucess'})
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                throw err
            }
            var dbase = db.db('blog');
            dbase.collection(req.body.saveCollection).insertOne(comment, (err_, response) => {
                if (err_) {
                    throw err_;
                }
                console.log("插入文章评论成功");
                db.close();
            })
        
        } )
    },

}
