/**
 * Created by welcome on 10/19/2015.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Course',{
    code : String,
    title : String,
    type : String,
    l : Number,
    t : Number,
    p : Number,
    c : Number,
    school : String,
    program : String,
    slots : Array,
    mode : String,
    seats : Number,
    list_faculty : {type: Array, default: []},
    isDone: {type:Boolean, default:false}
},
'myCollection'
);
