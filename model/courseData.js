/**
 * Created by welcome on 10/19/2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('CourseData',{
    code : String,
    title : String,
    type : String,
    l : Number,
    t : Number,
    p : Number,
    c : Number,
    school : String,
    program : String,
    slot : String,
    mode : String,
    available : Number,
},
'myCollection2'
);
