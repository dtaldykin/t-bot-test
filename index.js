var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

const token = process.env.T_TOKEN

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.post('/new-message', function (req, res) {
    const { message } = req.body
    if (!message || message.text.toLowerCase() !== '/isthispeacedeath') {
        return res.end()
    }

    const sec = new Date().getSeconds()
    axios.post(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                chat_id: message.chat.id,
                text: sec > 30 ? 'Ещё нет, всё впереди' : 'Это не кризис, это ПИЗДЕЕЕЦ'
            }
        )
        .then(response => {
            console.log('Message posted')
            res.end()
        })
        .catch(err => {
            console.log('Error :', err)
            res.end('Error :' + err)
        })
})

module.exports = app