const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
app.use(cors())

const port = 4000;

const db = require('./queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/data', db.getData);
app.get('/locations', db.getLocations);
app.get('/data/:date', db.getDataByDate);
app.get('/data/:date/:latitude/:longitude', db.getDataByDateAndLocation);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})
