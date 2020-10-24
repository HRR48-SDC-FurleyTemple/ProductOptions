const newrelic = require('newrelic')

const app = require('./postgresApp.js');
// const app = require('./CassandraApp.js');

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

