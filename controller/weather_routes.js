const express = require('express')
// router variable instead of app
const router = express.Router()
const fetch = require('node-fetch')



router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', async (req, res) => {
    // console.log(req.body)
    const targetUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${req.body.zip},us&units=imperial&appid=7491e9be98eb7aafc1c275a2ef552378`
    const response = await fetch(targetUrl)
    const body = await response.json()
    if (body.cod === 200) {
        body.main.temp = Math.floor(body.main.temp)
        body.main.feels_like = Math.floor(body.main.feels_like)
    }
    // console.log(body)
    res.render('show', { body: body })
})

module.exports = router