const express = require('express')
// router variable instead of app
const router = express.Router()
// require node-fetch since normal fetch is not supported in node environments
const fetch = require('node-fetch')

// basic GET index route
router.get('/', (req, res) => {
    res.render('index')
})

// POST route to show weather results since we need a request body
router.post('/', async (req, res) => {
    // console.log(req.body)
    // set target URL to a string since we can't template literal inside of a fetch request
    const targetUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip},us&units=imperial&appid=${process.env.API_KEY}`
    // save whatever comes back, asynchronously
    const response = await fetch(targetUrl)
    // get a JSON object with the response data so it can be manipulated
    const body = await response.json()
    // get a new date object for posting to the results page
    const date = new Date
    // if the body returns successfully, round the temperature down to the nearest whole degree
    if (body.cod === 200) {
        body.main.temp = Math.floor(body.main.temp)
        body.main.feels_like = Math.floor(body.main.feels_like)
        body.main.temp_max = Math.floor(body.main.temp_max)
        body.main.temp_min = Math.floor(body.main.temp_min)
        if (body.main.temp >= 90) {
            body.main.hot = true
        } else if (body.main.temp <= 40) {
            body.main.cold = true
        }
    }
    // console.log(body)
    // render the show page and send the whole body and two other keys to represent just the time
    res.render('show', { body: body, time: date.toLocaleTimeString() })
})

module.exports = router