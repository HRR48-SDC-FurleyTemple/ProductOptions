let pgres = require('./index.js');
let info = require('./info.js');

let copyItemsQuery = `COPY items(ID, title, description, "originalPrice", "salePrice", colors, sizes, liked, "inStock")
FROM '${info.path}/items.csv'
DELIMITER ','
CSV HEADER`

let copyReviewsQuery = `COPY reviews(prodID, "easeOfAssembly", "valueForMoney", "productQuality", appearance, "worksAsExpected", "overallRating", "createdAt", "iRecommendThisProduct", header, body)
FROM '${info.path}/reviews.csv'
DELIMITER ','
CSV HEADER`

pgres.connect();


pgres.query(copyItemsQuery)
  .then(() => {
    console.log('items.csv copied');
    return pgres.query(copyReviewsQuery);
  })
  .then(() => {
    console.log('reviews csv copied');
    return pgres.end();
  })
  .catch(err => {
    console.error(err);
    return pgres.end();
  })
