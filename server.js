const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// registering the partials
hbs.registerPartials(__dirname + '/views/partials');
// setting using hbs library
app.set('view engine' , 'hbs');

// midleware-- adding functionality
app.use((req , res , next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('sever.log' , log + '\n' , (e) => {
        if (e) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// adding maintainance middleware
//app.use((req , res , next) => {
//    res.render('maintainance.hbs');
//});

// adding a static page
app.use(express.static(__dirname + '/public'));

// setting a helper function
hbs.registerHelper('getCurrentYear' , () => {
    return new Date().getFullYear(); 
});

hbs.registerHelper('screenIt' , (text) => {
    return text.toUpperCase();
});
// registering a handler using app.get(url , function(req , res))
app.get('/' , (req , res) => {
    res.render('home.hbs' , {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website",
    });
});

app.get('/about' , (req , res) => {
    res.render('about.hbs' , {
        pageTitle: "About page",
    }); 
});

// binding the app to port localhost:3000
app.listen(3000 , () => {
    console.log("Server is up on port 3000");
});


















