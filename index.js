// nodejs scalable stocks app by Lochlan Denholm
// 15 sept 2019

const express = require('express');
const exphbs  = require('express-handlebars');
// init express app
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

// configured for local + webhost env
const PORT = process.env.PORT || 5000;

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// IEX API Key pk_0c164efd8323488bbcfc96c5f2f2865d
// making call api func
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_0c164efd8323488bbcfc96c5f2f2865d', { json: true }, (err, res, body) => {
    if (err) {
        return console.log(err);
    };
    if (res.statusCode === 200)
    {
        //console.log(body);
        finishedAPI(body);
    };
});
}


// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set handlebar GET routes
// handlebar = easy backend - front end parsing of variables.
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        }); 
    }, "fb");
});

// About.html routing
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Create POST route for searching
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        //posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,
        }); 
    }, req.body.stock_ticker);
});

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


// listen on port
app.listen(PORT, () => console.log('Server listening on port ' + PORT));