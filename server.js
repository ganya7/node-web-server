const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next/*next so that we can tell express when our middleware function is done*/) => {
    var now = new Date().toString();
    var logger = `${now}${request.method}${request.url}`;
    console.log(logger);
    fs.appendFileSync('server.log', logger + '\n');
    next();  //if next is not called then handler for each request is not fired ie app.get()
});
/*app.use((req, res, next) => {

    res.render('maintenance.hbs');
});*/

//number of middleware can be used in a single express app
app.use(express.static(__dirname + '/public')); //express middleware, to use and teach express functionalities that express doesnt have

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
app.get('/', (request, response) => {   //handler for
// response.send('hello express');
    response.render('home.hbs', {
        pageTitle: 'home page',
        welcomeMessage: 'welcome to my website',
        // currentYear: new Date().getFullYear()
    })
});
app.get('/about', (request, response) => {
    // response.send('about page');
    response.render('about.hbs', {
        title: 'good title',
        // currentYear: new Date().getFullYear()
    });
});
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'unable to handle request'
    });
});
app.listen(3000, () => {
    console.log('server is up and running on port 3000');
});
//camtasia2