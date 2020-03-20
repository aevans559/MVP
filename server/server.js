const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 5500;
const COD_PSN = require('call-of-duty-api')(({platform: 'psn'}));
const COD_XBL = require('call-of-duty-api')(({platform: 'xbl'}));
require('dotenv').config();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(process.cwd(), '/client/public')));

app.get('/', (req, res) => {
    res.send('hello from server')
});

// route for playstation users
app.get('/psn/:gtag', (req, res) => {
    COD_PSN.MWstats(req.params.gtag, COD_PSN.platforms.psn)
        .then((output) => {
            res.json(output)
        })
        .catch(err => console.log(err))
})

// route for xbox users
app.get('/xbl/:gtag', (req, res) => {
    COD_XBL.MWstats(req.params.gtag, COD_XBL.platforms.xbl)
        .then((output) => {
            res.json(output)
        })
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});