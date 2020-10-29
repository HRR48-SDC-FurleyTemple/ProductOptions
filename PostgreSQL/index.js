const { Client } = require('pg');
const client = new Client({
  host: /* HOST */,
  user: /* USER */,
  password: /* PW */,
});

module.exports = client;