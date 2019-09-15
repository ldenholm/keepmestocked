// nodejs scalable stocks app by Lochlan Denholm
// 15 sept 2019

const express = require('express');
const exphbs  = require('express-handlebars');
// init express app
const app = express();
const path = require('path');
const request = require('request');

// configured for local + webhost env
const PORT = process.env.PORT || 5000;

// IEX API Key pk_0c164efd8323488bbcfc96c5f2f2865d
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_0c164efd8323488bbcfc96c5f2f2865d', { json: true }, (err, res, body) => {
    if (err) {
        return console.log(err);
    };
    if (res.statusCode === 200)
    {
        console.log(body);
    };
});


// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff.!!>!>";

// Set handlebar routes
// handlebar = easy backend - front end parsing of variables.
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

// About.html routing
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


// listen on port
app.listen(PORT, () => console.log('Server listening on port ' + PORT));