require('dotenv').config();

const path = require('path');

const express = require('express');
const { send } = require('process');

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === 'development') { // on Heroku machine, an env variable is called "NODE_ENV" --> "production"
    const cors = require('cors');
    server.use(cors());
}

// our API will go here

// catch all for any unknown requests - just sends back index.html
server.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});