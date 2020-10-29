const app = require('./postgresApp.js');

const PORT = 8080;
const HOST = 'localhost';
app.listen(PORT, HOST,  () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})

