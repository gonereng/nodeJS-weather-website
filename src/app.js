const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates/views');
const partialsPath = path.join(__dirname, '..', 'templates/partials');

// setup hbs and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static sirectory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roland',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Roland',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Roland',
        message: 'This page is there to help you',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    geocode(
        req.query.address,
        (error, { location, longitude, latitude } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                res.send({
                    location,
                    forecast: data,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops something went wrong',
        name: 'Roland',
        errorMessage: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops something went wrong',
        name: 'Roland',
        errorMessage: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
