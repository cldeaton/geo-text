var express  = require("express"),
    app      = express(),
    path     = require("path");



app.use(express.static('dist'));


// landing page
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + "/dist/index.html"));
})

app.POST("/SMS", function(req, res){

 })

//listening Route
app.listen(process.env.PORT || 2200, function(){
    console.log("Server has started!!");
});
