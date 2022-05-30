var express = require('express');
var router = express.Router();
const userModel = require('./users')

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/saveContact', function(req,res){
  if(req.body.cname !== "" && req.body.cnumber !== ""){
    userModel.create({
      cname:req.body.cname,
      cnumber:req.body.cnumber
    })
    .then(function(data){
      res.redirect('/find')
    })
    .catch(function(err){
      res.send(err)
    })
  }
  else{
    res.send("Please enter some values")
  }
})

router.get('/find',function(req,res){
  userModel.find()
  .then(function(data){
    res.render('allContacts', {data})
  })
})

router.get('/delete/:id', function(req,res){
  userModel.findOneAndDelete({_id:req.params.id})
  .then(function(){
    res.redirect('/find')
  })
  .catch(function(err){
    res.send(err)
  })
})

router.get('/update/:id', function(req,res){
  userModel.findOne({_id:req.params.id})
  .then(function(data){
    res.render('update', {data})
  })
  .catch(function(err){
    res.send(err)
  })
} )

router.post('/update/:id', function(req,res){
  var c = {
    cname:req.body.cname,
    cnumber:req.body.cnumber
  }
  userModel.findOneAndUpdate({_id:req.params.id}, c)
  .then(function(){
    res.redirect('/find')
  })
  .catch(function(err){
    res.send(err)
  })
})
module.exports = router;
