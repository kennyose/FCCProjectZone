//FCC Abuja ProjectZone
//This is our server entry point ===> app.js

// Express will be our server framework so we import (require) it as a first dependency

var express = require('express');

// Now we initialize express as our server app

var app = express();


/**
 *  Express is initialized as app so all the app() functions are available for use
 */

// The server can accept requests and send responses on specific links/endpoints

//Example:

// When a user visits the homepage send the Welcome Text
app.get('/', function(request, response) {
    response.send('Hello! Welcome to ProjectZone')
})

// When a user visits /about/<yourname> send a reply with 'your name'
app.get('/about/:name', function(request, response) {
    var myName = request.params.name;
    response.send('Hi, My name is ' + myName.toUpperCase());
})

//Setup the port for the server to listen on ==> port 3000
const PORT = 3000;

// Start the server, listening on port = PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT)
})