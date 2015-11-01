var myfunc = function()
{
var i=0;
var n=document.getElementById('myTable2').rows.length;
var tcourse_codes = [];
var tslots = [];
var lexp = [];
var texp= [];
var tcount = 0;
for(i=0;i<n;i++)
{
  var c = document.getElementById('myTable2').rows[i].cells;
  if( document.getElementById('myTable2').rows[i].style.backgroundColor == "lime")
  {
    tcourse_codes[tcount] = c[0].innerHTML;
    var d = c[0].innerHTML;
    var e = "t" + d;
    console.log(e);
    var t = document.getElementById(e).value;
    texp[tcount] = t;
    tcount++;
  }
}
var i=0;
var n=document.getElementById('myTable').rows.length;
var lcourse_codes = [];
var lslots = [];
var lcount=0;
for(i=0;i<n;i++)
{
  var c = document.getElementById('myTable').rows[i].cells;
  if(document.getElementById('myTable').rows[i].style.backgroundColor == "lime")
  {
    lcourse_codes[lcount] = c[0].innerHTML;
    var d = c[0].innerHTML;
    var e ="l" + d;
    var l = document.getElementById(e).value;
    lexp[lcount] = l;
    lcount++;
  }
}
var obj = new Object();
obj.faculty_id = document.getElementById("facid").innerHTML;
obj.theory =[tcourse_codes,texp];
obj.lab = [lcourse_codes,lexp];
var course_selected = JSON.stringify(obj);
console.log(course_selected);
$.post("/",obj,
function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
});
//console.log(course_selected);
};
