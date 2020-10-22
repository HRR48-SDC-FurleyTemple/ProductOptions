const { Client } = require('pg');
const info = require('./info.js'); // should refactor to use a .env file later
const client = new Client(info.connection);

module.exports = client;