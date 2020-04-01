const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jose Santiago'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jose Santiago'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help message to display!',
        title: 'Help',
        name: 'Jose Santiago'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error: error })
        }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error: error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

            })
    })
})

app.get('/products', (req, res)=> {
    
    if (!req.query.search) {
        return res.send({
            error: 'Search term not provided!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404!',
        errorMsg: 'The requested help article was not found!',
        name: 'Jose Santiago'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404!',
        errorMsg: 'The requested page was not found!',
        name: 'Jose Santiago'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})