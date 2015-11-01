var express = require('express');
var router = express.Router();

var myCollection = require('../model/Course.js');
var User = require('../model/user.js');
var funct1 = require('../model/function1.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  myCollection.find({'school' : 'SCSE'}, function(err, users){
      if(err){
        res.send(err);
      }
      User.findOne({'id': req.session.fac_id},function(err, fre){
        if(err){
          res.send(err);
        }
    //    console.log(fre);
        res.render('table.ejs',{data: users,user: fre});
      });

  });
});

router.get('/login', function(req, res){
  res.render('login.ejs');
});

var updateRecord = function(i, data){
  User.findOne({id : i}, function(err, user){
    if(err){
      res.send(err);
    }
    user.ltpc = data;
    user.isDone = true;
    user.save();
  });
}

router.post('/correct', function (req, res) {
  for(var i = 14071; i <= 14074; i++){
    if (req.body[i]){
      updateRecord(i,req.body[i]);
    }
  }
  res.redirect('/admin');
});

router.post('/login', function(req, res){
  User.findOne({id : req.body.fac_id}, function(err, user){
    if(err){
      res.send(err);
    }
    if(user === null){
      res.redirect('/login');
    }
    else{
//    console.log(user);
    req.session.fac_id = user.id;
    if(!user.isDone){
      res.redirect('/');
    }
    else {
        res.redirect('/result');
    }
  }
  });
});

router.get('/result',function (req, res){
  User.findOne({id: req.session.fac_id}, function(err, user){
    if(err){
      res.send(err);
    }
    res.render('final.ejs', {t_content: user.ltpc});
  });
});

function prins(array, objec){
//  console.log(objec);
//  console.log(array);
  var i = 0,j = 0;
  if ((array.length == 0) || (typeof array == 'undefined')){
    array = [];
    array[0] = objec;
    return array;
  }
  else{
  while(i < array.length){
    if(array[i].exp > objec.exp){
      j++;
    }
    else {
      break;
    }
    i++;
  }
  array.insert(j,objec);
  return array;
  }
}

function labwork(i, username, lab, isLab){
  var queries = [];
  //console.log(lab);
  if(isLab){
    queries[0] = "ELA";
    queries[1] = "LO";
  }
  else{
    queries[0] = "ETH";
    queries[1] = "TH";
  }
  myCollection.findOne({
    $and:[
    {'code':lab[0][i]},
    {$or: [{'type': queries[0]},{'type': queries[1]}]}
    ]
  },
     function(err, user){
    if(err){
      res.send(err);
    }
    var objec = {};
    objec.id = username;
    objec.exp = lab[1][i];
    user.list_faculty = prins(user.list_faculty, objec);
    user.save();
  });
}


Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

router.post('/', function(req, res){
  var t = [];
  var lab = [];
  t[0] = req.body['theory[0][]'];
  t[1] = req.body['theory[1][]'];


  for( i = 0; i < t[0].length; i++){
    labwork(i,req.body.faculty_id,t,false);
  }

  lab[0] = req.body['lab[0][]'];
  lab[1] = req.body['lab[1][]'];


  for( i = 0; i < lab[0].length; i++){
    labwork(i,req.body.faculty_id,lab,true);
  }

//  console.log("Lab: " + lab);
 funct1(req.body.faculty_id, t, lab);
  res.send(req.body);
});

router.get('/admin', function(req, res){
  res.render('admin.ejs');
});

router.get('/admin/user', function(req, res){
  res.render('admin_user.ejs');
});

router.get('/admin/course', function(req, res){

  myCollection.find({'school':'SCSE'}, function(err, users){
      if(err){
        res.send(err);
      }
      res.render('admin_course.ejs',{courses: users});
    });
});



module.exports = router;
