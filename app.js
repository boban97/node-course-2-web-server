// Modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Hanglebars configuration
hbs.registerPartials(`${__dirname}/views/partials`);

// Handlebars heleprs
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// Express configuration
let app = express();

// Middleware
app.set('viewengine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, error => {
        if(error)
            console.log('Unable to append to server.log.');
    });

    next();
});

/*app.use((req, res, next) => {
    res.render('maitenance.hbs');
});*/

app.use(express.static(`${__dirname}/public`));

// Routing
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Webstite!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server has started on the port ${process.env.PORT}`);
});