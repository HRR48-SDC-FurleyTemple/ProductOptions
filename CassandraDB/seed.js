var client = require('./index.js');

// let query1 = `CREATE KEYSPACE Mykea with replication =
// {'class' : 'SimpleStrategy', 'replication_factor' : 1}` ;
// client.execute(query1)
//   .then(result => console.log('keyspace created'));

// let query2 = `
// CREATE TABLE items (
//   itemid int,
//   timestamp timestamp,
//   title text,
//   description text,
//   colors set<text>,
//   sizes set<text>,
//   price map<text, int>,
//   liked boolean,
//   inStock int,
//   originalPrice int,
//   salePrice int,
//   reviews set <frozen <map<text, >>>,
//   PRIMARY KEY (itemid, changedate)
// ) WITH CLUSTERING ORDER BY (timestamp DESC);`

let createTable = `CREATE TABLE IF NOT EXISTS items (
  ID int,
  TITLE text,
  DESCRIPTION text,
  OGPRICE int,
  SALEPRICE int,
  COLORS text,
  SIZES text,
  LIKED text,
  INSTOCK int,
  REVIEWS text,
  PRIMARY KEY (ID)
);`

// let copyCSV = "COPY mykea.items (ID,TITLE,DESC,OGPRICE,SALEPRICE,COLORS,SIZES,LIKED,INSTOCK,REVIEWS) FROM 'DataGeneration/test.csv' WITH DELIMITER=',' AND HEADER=TRUE"

// paste this into cqlsh after creating the table by running the file
// COPY mykea.items (id, title, description, ogprice, saleprice, colors, sizes, liked, instock, reviews) FROM 'DataGeneration/test.csv' WITH DELIMITER=',' AND HEADER=TRUE ;

client.execute(createTable)
  .then(result => {
    console.log('table created, beginning to copy data from csv');
    return client.shutdown();
  })
  .catch(err => {
    console.error('Problem! It\'s :', err);
    return client.shutdown()
    .then(() => {throw err})
  })