var cassandra = require('cassandra-driver');


var client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykea'
});


module.exports = client;