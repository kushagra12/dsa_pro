var courseData = require('./courseData.js');
var User = require('./user.js');

module.exports = function(fac_id, theory, lab){
      var flag = Math.random() < .5;
    //  console.log(theory, lab);
      allot(fac_id,theory,lab,flag);
}

var getData = function(code, x,type, callback){
  var queries = [];
  var obj = {};
  obj.slot =[];
  obj.available = [];
  //console.log(code);
  if(type == true){
    queries[0] = "ELA";
    queries[1] = "LO";
  }
  else{
    queries[0] = "ETH";
    queries[1] = "TH";
  }

  courseData.find({
    $and:[
    {'code':code},
    {$or: [{'type': queries[0]},{'type': queries[1]}]}
    ]
  },
     function(err, user){
    if(err){
      res.send(err);
    }
    for(x in user){
      obj.slot[x] = user[x].slot;
      obj.available[x] = user[x].available;
    }
    //console.log("User");
    callback(obj,x);
  });

}

var allot = function(fac_id,theory,lab,flag){

  //console.log(theory, lab);
  var counter = 0;
  var th = [];
  var lb = [];

  for(var x = 0; x < theory[0].length; x++){
  getData(theory[0][x], x , true,function(obj, x){
    th[x] = obj;
  //  console.log(th);
    if(++counter == (theory[0].length + lab[0].length))
      console.log(th, lb);
  });
  }

  for(var y = 0; y < lab[0].length; y++){
   getData(lab[0][y],y,false,function(obj, x){
    lb[x] = obj;
  //  console.log(lb);
    if(++counter == (theory[0].length + lab[0].length))
      console.log(th, lb);
  });
  }
}
