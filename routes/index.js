var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url ='mongodb://localhost:27017/';


router.get('/',function(req,res,next){
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbase=db.db('firstdb')
    dbase.collection("orders").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.render('index',{items:result})
    },function(){
      db.close();
     
    });
  })
});

router.get('/insert',function(req,res,next){
  res.render('insert');
});


router.post('/pagination',function(req,res,next){
  var startindex = parseInt(req.body.startindex);
  var endindex = parseInt(req.body.endindex);
  var num = (endindex-startindex);

   mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbase=db.db('firstdb')
    dbase.collection("orders").find({}).skip(startindex).limit(num).toArray(function(err, result) {
      if (err) throw err;
      res.render('index',{items:result})
    },function(){
      db.close();
     
    });
  })
})

router.get('/search',function(req,res,next){
  var str = req.query.searchstr;
  var query = {productname:str};
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbase=db.db('firstdb')
    dbase.collection("orders").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.render('index',{items:result})
    },function(){
      db.close();
     
    });
  })
});

module.exports = router;


