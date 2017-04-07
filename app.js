//FCC Abuja ProjectZone
//This is our server entry point ===> app.js

// Express will be our server framework so we import (require) it as a first dependency

var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override")
    Hospital  = require("./models/hospital"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

// Express is initialized as app so all the app() functions are available for use
  var app   = express();


// Phase Json object into node
app.use(bodyParser.urlencoded({extended: true}));

// Set Default Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//requiring routes
var commentRoutes    = require("./routes/comments"),
    hospitalRoutes = require("./routes/hospitals"),
    indexRoutes      = require("./routes/index")

//Connecting to Database
//mongoose.connect("mongodb://127.0.0.1/fccprojectzone");
var url = "mongodb://127.0.0.1/fccprojectzone"
mongoose.connect(url);


app.get("/", function(req, res){
    res.render("index");
});


app.get('/register', function(req, res) {
    res.render('register');
})

app.get('/login', function(req, res) {
    res.render('login');
})




//Setup the port for the server to listen on ==> port 3000
const PORT = 3000;

// Start the server, listening on port = PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT)
})