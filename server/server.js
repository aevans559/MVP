const express = require('express');
const app = express();
const axios = require('axios');
const port = 5500;

const cors = require('cors');
const config = require('../config.js')
const path = require('path');
const COD_PSN = require('call-of-duty-api')(({platform: 'psn'}));
const COD_XBL = require('call-of-duty-api')(({platform: 'xbl'}));

app.use(cors());

app.use(express.static(path.join(process.cwd(), '/client/public')));

app.get('/', (req, res) => {
    res.send('hello from server')
});

// route for playstation users
app.get('/psn/:gtag', (req, res) => {
    let obj = {}
    COD_PSN.MWstats(req.params.gtag, COD_PSN.platforms.psn)
        .then(output => obj['1'] = output)
        .then(axios.get(`https://public-api.tracker.gg/apex/v1/standard/profile/2/${req.params.gtag}`, {headers: {'TRN-Api-Key': `${config.apiKey}`}})
                .then(output => obj['2'] = output.data)
                .then(() => res.send(obj))
                .catch(err => console.log(err)))
        .catch(err => console.log(err))
})

// route for xbox users
app.get('/xbl/:gtag', (req, res) => {
    let obj = {}
    COD_XBL.MWstats(req.params.gtag, COD_XBL.platforms.xbl)
        .then(output => obj['1'] = output)
        .then(axios.get(`https://public-api.tracker.gg/apex/v1/standard/profile/1/${req.params.gtag}`, {headers: {'TRN-Api-Key': `${config.apiKey}`}})
                .then(output => obj['2'] = output.data)
                .then(() => res.send(obj))
                .catch(err => console.log(err)))
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});