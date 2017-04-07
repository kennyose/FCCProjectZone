//FCC Abuja ProjectZone
//This is our server entry point ===> app.js

// Express will be our server framework so we import (require) it as a first dependency

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override")
    //Campground  = require("./models/campground"),
    //Comment     = require("./models/comment"),
    //User        = require("./models/user"),
    //seedDB      = require("./seeds")

// Now we initialize express as our server app


// Phase Json object into node
app.use(bodyParser.urlencoded({extended: true}));

// Set Default Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

/**
 *  Express is initialized as app so all the app() functions are available for use
 */

// The server can accept requests and send responses on specific links/endpoints

//Example:

// When a user visits the homepage send the Welcome Text

app.get("/", function(req, res){
    res.render("index");
});


app.get('/register', function(req, res) {
    res.render('register');
})

app.get('/signin', function(req, res) {
    res.render('signin');
})


//Setup the port for the server to listen on ==> port 3000
const PORT = 3000;

// Start the server, listening on port = PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT)
})