let pgres = require('./index.js');
let info = require('./info.js');

  let copyItemsQuery = (num) => `COPY items(ID, title, description, "originalPrice", "salePrice", colors, sizes, liked, "inStock")
  FROM '${info.path}/items${num}.csv'
  DELIMITER ','
  CSV HEADER`

  let copyReviewsQuery = (num) => `COPY reviews(prodID, "easeOfAssembly", "valueForMoney", "productQuality", appearance, "worksAsExpected", "overallRating", "createdAt", "iRecommendThisProduct", header, body)
  FROM '${info.path}/reviews${num}.csv'
  DELIMITER ','
  CSV HEADER`

let run = () => {

  pgres.connect();

  pgres.query(copyItemsQuery(1))
    .then(() => {
      return pgres.query(copyItemsQuery(2))
    })
    .then(() => {
      return pgres.query(copyItemsQuery(3))
    })
    .then(() => {
      return pgres.query(copyItemsQuery(4))
    })
    .then(() => {
      return pgres.query(copyItemsQuery(5))
    })
    .then(() => {
      return pgres.query(copyItemsQuery(6))
    })
    .then(() => {
      return pgres.query(copyItemsQuery(7))
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(1));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(2));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(3));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(4));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(5));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(6));
    })
    .then(() => {
      return pgres.query(copyReviewsQuery(7));
    })
    .then(() => {
      console.log('csvs successfully copied');
      return pgres.end();
    })
    .catch(err => {
      console.error(err);
      return pgres.end();
    })
}

run();

