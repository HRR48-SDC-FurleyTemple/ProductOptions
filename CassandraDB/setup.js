const cassie = require('./index.js');

let dropItems = `DROP TABLE IF EXISTS mykea.items;`
let dropReviews = `DROP TABLE IF EXISTS mykea.reviews;`

let createItems = `CREATE TABLE IF NOT EXISTS items (
  ID int,
  TITLE text,
  DESCRIPTION text,
  "originalPrice" int,
  "salePrice" int,
  COLORS text,
  SIZES text,
  LIKED boolean,
  "inStock" int,
  PRIMARY KEY (ID)
);`

let createReviews = `CREATE TABLE IF NOT EXISTS reviews (
  ID int,
  "easeOfAssembly" int,
  "valueForMoney" int,
  "productQuality" int,
  APPEARANCE int,
  "worksAsExpected" int,
  "overallRating" int,
  "createdAt" text,
  "iRecommendThisProduct" boolean,
  HEADER text,
  BODY text,
  PRIMARY KEY (ID, "createdAt")
);`

// paste these lines into cqlsh after creating the tables
// COPY mykea.items (id, title, description, "originalPrice", "salePrice", colors, sizes, liked, "inStock") FROM 'DataGeneration/items.csv' WITH DELIMITER=',' AND HEADER=TRUE ;
// COPY mykea.reviews (id, "easeOfAssembly", "valueForMoney", "productQuality", appearance, "worksAsExpected", "overallRating", "createdAt", "iRecommendThisProduct", header, body) FROM 'DataGeneration/reviews.csv' WITH DELIMITER=',' AND HEADER=TRUE ;


cassie.execute(dropItems)
  .then(() => {
    return cassie.execute(createItems);
  })
  .then(() => {
    return cassie.execute(dropReviews);
  })
  .then(() => {
    return cassie.execute(createReviews);
  })
  .then(() => {
    return cassie.shutdown();
  })
  .catch(err => {
    console.error('Problem! It\'s :', err);
    return cassie.shutdown()
    .then(() => {throw err})
  })