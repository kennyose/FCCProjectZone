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
    User        = require("./models/user")
   

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

//1 This will connect locally to your system
//mongoose.connect("mongodb://127.0.0.1/hospitaldata");

//2 This will connect the database to the cloud(www.mlab.com)
mongoose.connect("mongodb://hospital:hospital@ds155160.mlab.com:55160/hospitaldata");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



// Start Calling API
app.use("/", indexRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/hospitals/:id/comments", commentRoutes);



//Setup the port for the server to listen on ==> port 3000
const PORT = process.env.PORT || 3000;

// Start the server, listening on port = PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT)
})