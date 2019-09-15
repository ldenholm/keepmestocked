const express = require('express');
const exphbs  = require('express-handlebars');
// init express app
const app = express();
const path = require('path');

// configured for local + webhost env
const PORT = process.env.PORT || 5000;

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

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));


// listen on port
app.listen(PORT, () => console.log('Server listening on port ' + PORT));