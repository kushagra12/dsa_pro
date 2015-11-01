var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
  name: String,
  id: Number,
  designation: String,
  school: Number,
  isDone: {type:Boolean, default:false},
  ltpc: Array
},
'users');
