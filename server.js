const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// app.use(function(req, res, next) {
//   console.log('MANUTENZIONE...');
//   res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.originalUrl} \n${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Non riesco ad aggiungere info al file server.log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});
hbs.registerHelper('maiuscolo', function(text) {
  return text.toUpperCase();
});

app.get('/', function(req, res) {
  // res.send("<h1>Hello Express!</h1>");
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Benvenuto nella '
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    pageTitle: 'About Page',
  });
});

app.get("/project", function(req, res){
  res.render("project", {
    pageTitle: "Project Page"
  });
});

app.get('/bad', function(req, res) {
  res.send({
    errore: 'Status 400'
  });
});

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
