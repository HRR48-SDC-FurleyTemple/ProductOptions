const express = require('express');
const app = express();
const pgres = require('../PostgreSQL/index.js');
const path = require('path');


app.use(express.json())
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))

pgres.connect();


app.get('/api/productOptions/products/:id', (req, res) => {
  let builtResponse;
  let id = req.params.id;
  let getItemsQuery = `SELECT * FROM items WHERE id = ${id}`;
  let getReviewsQuery = `SELECT * FROM reviews WHERE prodId = ${id}`;

  // ideally this would be a single query that joins the reviews result as a property of the items table, but I have to move ahead for now
  pgres.query(getItemsQuery)
    .then(result => {
      builtResponse = result.rows[0];
      builtResponse.price = {originalPrice: builtResponse.originalPrice, salePrice: builtResponse.salePrice};
      delete builtResponse.originalPrice;
      delete builtResponse.salePrice;
      for (let prop in builtResponse) {
        if (builtResponse[prop] === null) {
          builtResponse[prop] = 'No options provided for this product';
        }
      }
      builtResponse.colors = builtResponse.colors.split(',');
      builtResponse.sizes = builtResponse.sizes.split(',');
      return pgres.query(getReviewsQuery);
    })
    .then(result => {
      builtResponse.reviews = result.rows;
      return res.json(builtResponse);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send({error: `Item with ID: ${id} not found`});
    })
})


app.post('/api/productOptions/products/:id/reviews', (req, res) => {
  const { overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct } = req.body;
  let id = req.params.id;

  let postReview = `INSERT INTO
  reviews
  (prodid,
    "easeOfAssembly",
    "valueForMoney",
    "productQuality",
    appearance,
    "worksAsExpected",
    "overallRating",
    "createdAt",
    "iRecommendThisProduct",
    header,
    body)
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
  )`

 let params = [id, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, overallRating, createdAt, iRecommendThisProduct, header, body]

 pgres.query(postReview, params)
   .then(() => {
     return res.json('successful post to reviews');
   })
   .catch((err) => {
     console.error(err);
     return res.status(400).send({error: `error adding review to database`});
   })

})

app.post('/api/productOptions/products', (req, res) => {

  const { price, colors, sizes, title, description, liked, inStock} = req.body;

  let postItem = `INSERT INTO
  items
  (title,
    description,
    colors,
    sizes,
    "originalPrice",
    "salePrice",
    liked,
    "inStock")
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
  )`

  let params = [title, description, colors.toString(), sizes.toString(), price.originalPrice, price.salePrice, liked, inStock]

  pgres.query(postItem, params)
    .then(() => {
      return res.json('successful post');
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send({error: `error adding item to database`});
    })

  })

  app.put('/api/productOptions/products/:id', (req, res) => {

    let id = req.params.id;
    const { price, colors, sizes, title, description, liked, inStock} = req.body;

    var updateItem = `UPDATE items
    SET
    title = '${title}',
    description = '${description}',
    "originalPrice" = ${price.originalPrice},
    "salePrice" = ${price.salePrice},
    colors = '${colors}',
    sizes = '${sizes}',
    liked = ${liked},
    "inStock" = ${inStock}
     WHERE id = ${id}`;

     pgres.query(updateItem)
     .then(() => {
       return res.json('successful update');
     })
     .catch((err) => {
       console.error(err);
       return res.status(400).send({error: `error updating item in database. ensure all fields are properly filled out.`});
     })
  })


// app.delete('/api/productOptions/products/ALL', (req, res) => {
// })

app.delete('/api/productOptions/products/:id', (req, res) => {

  let id = req.params.id;

  let deleteReviews = `DELETE FROM reviews WHERE prodid = ${id}`
  let deleteItem = `DELETE FROM items WHERE id = ${id}`

  pgres.query(deleteReviews)
  .then(() => {
    return pgres.query(deleteItem);
  })
  .then(() => {
    return res.json('successful deletion of item and reviews');
  })
  .catch((err) => {
    console.error(err);
    return res.status(400).send({error: `error deleting item`});
  })

})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})



module.exports = app;