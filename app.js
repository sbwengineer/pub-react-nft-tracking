const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require("http")

const app = express()
const server = http.Server(app)

app.use(cors())
app.use(express.static(__dirname + '/client'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.json({ limit: "15360mb", type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'client/index.html')) })

server.listen(process.env.PORT || 3000, () => { console.log(`Started server on => http://localhost:${3000}`) })