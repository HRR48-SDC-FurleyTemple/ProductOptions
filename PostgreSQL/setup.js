let pgres = require('./index.js');

let createItemTable = `CREATE TABLE items(
  ID SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  colors TEXT,
  sizes TEXT,
  "originalPrice" INT,
  "salePrice" INT,
  liked BOOLEAN,
  "inStock" INT
)`;

let createReviewsTable = `CREATE TABLE reviews(
  ID SERIAL PRIMARY KEY NOT NULL,
  prodId INT REFERENCES items (ID),
  "easeOfAssembly" INT,
  "valueForMoney" INT,
  "productQuality" INT,
  appearance INT,
  "worksAsExpected" INT,
  "overallRating" INT,
  "createdAt" TEXT,
  "iRecommendThisProduct" BOOLEAN,
  header TEXT,
  body TEXT
)`;
pgres.connect();

// the commented code would create a specific database for this module, but then it becomes difficult to immediately connect
// so simply creating the tables in postgres should be acceptable for now

// pgres.query(`DROP DATABASE IF EXISTS mykea`)
//   .then(() => {
//     console.log('creating database');
//     return pgres.query(`CREATE DATABASE mykea`)
//   })
//   .then(() => {
    pgres.query(`DROP TABLE IF EXISTS reviews`)
  // })
  .then(() => {
    return pgres.query(`DROP TABLE IF EXISTS items`);
  })
  .then(() => {
    console.log('creating items table');
    return pgres.query(createItemTable);
  })
  .then(() => {
    console.log('creating reviews table');
    return pgres.query(createReviewsTable);
  })
  .then(() => {
    console.log('adding index to reviews table to optimize query speeds');
    return pgres.query(`create index idx_prodId ON reviews (prodId)`);
  })
  .then(() => {
    console.log('resetting max ID so that it can properly auto-increment');
    return pgres.query(`select setval('items_id_seq', (select MAX(id) from items))`);
  })
  .then(() => {
    console.log('setup complete, disconnecting');
    return pgres.end();
  })
  .catch(err => {
    console.error(err);
    return pgres.end();
  })