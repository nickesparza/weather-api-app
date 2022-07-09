const express = require('express')
// router variable instead of app
const router = express.Router()

router.get('/', (req, res) => {
    res.render('show')
})

router.get('/weather/78729', (req, res) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=78729,us&units=imperial&appid=7491e9be98eb7aafc1c275a2ef552378')
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

module.exports = router