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

let dropItems = `DROP TABLE IF EXISTS mykea.items;`
let dropReviews = `DROP TABLE IF EXISTS mykea.reviews;`

let createItems = `CREATE TABLE IF NOT EXISTS items (
  ID int,
  TITLE text,
  DESCRIPTION text,
  OGPRICE int,
  SALEPRICE int,
  COLORS text,
  SIZES text,
  LIKED boolean,
  INSTOCK int,
  PRIMARY KEY (ID)
);`
// let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
//   let valueForMoney = Math.floor(Math.random() * 5 + 1);
//   let productQuality = Math.floor(Math.random() * 5 + 1);
//   let appearance = Math.floor(Math.random() * 5 + 1);
//   let worksAsExpected = Math.floor(Math.random() * 5 + 1);
//   let overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
//   let createdAt = faker.date.past();
//   let iRecommendThisProduct = faker.random.boolean();
//   let header = faker.lorem.words();
//   let body = faker.lorem.paragraphs();

let createReviews = `CREATE TABLE IF NOT EXISTS reviews (
  ID int,
  EASEOFASSEMBLY int,
  VALUEFORMONEY int,
  PRODUCTQUALITY int,
  APPEARANCE int,
  WORKSASEXPECTED int,
  OVERALL int,
  CREATEDAT text,
  RECOMMENDED boolean,
  HEADER text,
  BODY text,
  PRIMARY KEY (ID, CREATEDAT)
);`

// paste these lines into cqlsh after creating the tables
// COPY mykea.items (id, title, description, ogprice, saleprice, colors, sizes, liked, instock) FROM 'DataGeneration/items.csv' WITH DELIMITER=',' AND HEADER=TRUE ;
// COPY mykea.reviews (id, easeofassembly, valueformoney, productquality, appearance, worksasexpected, overall, createdat, recommended, header, body) FROM 'DataGeneration/reviews.csv' WITH DELIMITER=',' AND HEADER=TRUE ;


client.execute(dropItems)
  .then(() => {
    return client.execute(createItems);
  })
  .then(() => {
    return client.execute(dropReviews);
  })
  .then(() => {
    return client.execute(createReviews);
  })
  .then(() => {
    return client.shutdown();
  })
  .catch(err => {
    console.error('Problem! It\'s :', err);
    return client.shutdown()
    .then(() => {throw err})
  })