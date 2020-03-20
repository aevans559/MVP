const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 5500;
const COD = require('call-of-duty-api')(({platform: 'psn'}));
require('dotenv').config();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(process.cwd(), '/client/public')));

app.get('/', (req, res) => {
    res.send('hello from server')
});

app.get('/gtag/:id', (req, res) => {
    COD.MWstats(req.params.id, COD.platforms.psn)
        .then((output) => {
            res.json(output)
        })
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});