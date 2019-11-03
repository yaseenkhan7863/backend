var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url ='mongodb://localhost:27017/';



router.post('/', function(req, res, next) {
  
  var item ={
    productname:req.body.productname,
    productcode:req.body.productcode,
    producttype:req.body.producttype,
    status:req.body.status
  };

  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbase = db.db('firstdb');
    dbase.collection('orders').insertOne(item,function(err,result){
      assert.equal(null,err);
      console.log('item inserted');
      db.close();
    })
  })
  res.redirect('/');
});




module.exports = router;