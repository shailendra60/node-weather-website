const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
//below is path for hbs files..or  templates
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath) //pointing viewsPath to views folder
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// home page using hbs
app.get('', (req, res) =>{
    res.render('index', {   // jst like res.send index is name of hbs file.... 1st arg name of the view to render
        title: 'Weather', //values view needs to acess.. refrenced in index.hbs
        name: 'Shailendra'
    })     
})

// home page 
//app.get('', (req, res) => {
  //  res.send('<h1>Weather</h1>')

//})

//about uing hbs
app.get('/about', (req, res) => {
    res.render('about', {
    title:'About me',
    name:'Shailendra'
    })
})

//about page
// app.get('/about', (req, res) => {
//     res.send('<h2>HTML</h2>') 
// })

app.get('/products', (req, res) =>{
    
    //if is only going to run when there is no search term
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search) //to get what has been searched/queried in the browser
    res.send({
        products: []
    })
})

//help page using hbs
app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help Page',
    helpText: 'This is some helpful text',
    name: 'Shailendra'
    })
})
// app.get('/help', (req, res) => {
//     res.send ([{
//         name: 'Shailendra',
//         age: 24
//     }, {
//         name: 'Sam',
//         age: 24
//     }])
// })

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
         })
         
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })

    // res.send({
    //     location: 'Delhi',
    //     forecast: 'Sunny',
    //     address: req.query.address

    // })
})

//when help specific wrong page has been searched
app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Shailendra',
        errormessage: 'Help article not found'

    })

})
//404 page
//* means anytning that has not been matched.. this has to come last always
//this is for any wrong generic page searched
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shailendra',
        errormessage: 'Page not found'
    })
})

//starting the server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})