const express = require('express');
const app = express();
const cassie = require('../CassandraDB/index.js')
const path = require('path');


app.use(express.json())
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))


// this function will find the highest id in the database that does not already have an entry. This 'highest' variable can be adjusted to narrow the
// search down -- for example the database was explicitly seeded with 10,000,000 entries, so there's no need to look before that for unused ids
let highest = 10000000;
let searchForHighest = () => {
  let tryHighest = cassie.execute(`SELECT * FROM mykea.items WHERE id = ${highest}`);

  tryHighest
  .then((results) => {
    // console.log(highest) // for debugging this function
    if (results.rows[0] !== undefined) {
      highest++;
      return searchForHighest();
    }
    console.log('highest reached at: ', highest)
    return;
  })
};

searchForHighest();

app.get('/api/productOptions/products/:id', (req, res) => {

  let constructedResponse;

  let id = req.params.id;
  let queryItems = `SELECT * FROM mykea.items WHERE id = ${id};`
  let queryReviews = `SELECT * from mykea.reviews WHERE id = ${id};`

  cassie.execute(queryItems)
    .then((results) => {
     return constructedResponse = results.rows[0];
    })
    .then(() => {
     return cassie.execute(queryReviews);
    })
    .then((results) => {
       return constructedResponse.reviews = results.rows;
    })
    .then(() => {
      // null values break client
      for (let prop in constructedResponse) {
        if (constructedResponse[prop] === null) {
          constructedResponse[prop] = 'No options provided for this product';
        }
      }
      // last step to 'nudge' data into the shape the client is expecting
      constructedResponse.colors = constructedResponse.colors.split(',');
      constructedResponse.sizes = constructedResponse.sizes.split(',');
      // condenses the prices into the object the client wants, then removes the top-level properties so the client doesn't receive anything unnecessary
      constructedResponse.price = {originalPrice: constructedResponse.originalPrice, salePrice: constructedResponse.salePrice};
      delete constructedResponse.originalPrice;
      delete constructedResponse.salePrice;
      return res.json(constructedResponse);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).send({error: `Item with ID: ${id} not found`});
    })
})

app.post('/api/productOptions/products/:id/reviews', (req, res) => {

  let id = req.params.id;
  const { overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct } = req.body;
  let queryAddReviews = `INSERT INTO mykea.reviews (id, "easeOfAssembly", "valueForMoney", "productQuality", appearance, "worksAsExpected", "overallRating", "createdAt", "iRecommendThisProduct", header, body ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let reviewParams = [id, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, overallRating, createdAt, iRecommendThisProduct, header, body];

  cassie.execute(queryAddReviews, reviewParams, {prepare: true})
    .then(result => {
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(400);
    })
})

app.post('/api/productOptions/products', (req, res) => {

  const { price, colors, sizes, title, description, liked, inStock, reviews } = req.body
  let queryAddItem = `INSERT INTO mykea.items (id, title, description, "originalPrice", "salePrice", colors, sizes, liked, "inStock") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let itemParams = [highest, title, description, price.originalPrice, price.salePrice, colors.toString(), sizes.toString(), liked, inStock]

  cassie.execute(queryAddItem, itemParams, {prepare: true})
  .then(() => {
    return searchForHighest();
  })
  .then(() => {
    return res.json("success");
  })
  .catch((err) => {
    console.error(err);
    return res.sendStatus(400);
  })

  })

  app.put('/api/productOptions/products/:id', (req, res) => {
    let id = req.params.id;
    const { price, colors, sizes, title, description, liked, inStock, reviews } = req.body

    var queryUpdate = `UPDATE mykea.items SET title = '${title}',
    description = '${description}',
    "originalPrice" = ${price.originalPrice},
    "salePrice" = ${price.salePrice},
    colors = '${colors}',
    sizes = '${sizes}',
    liked = ${liked},
    "inStock" = ${inStock}
     WHERE id = ${id}`;

    cassie.execute(queryUpdate)
      .then(() => {
        return res.json("update successful")
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(400);
      })
  })

  // unsure if ability to delete all 10,000,000 plus records is a good idea at this stage
// app.delete('/api/productOptions/products/ALL', (req, res) => {
//   db.Item.deleteMany({})
//   .then((results) => {
//     res.json(results);
//   })
// })

app.delete('/api/productOptions/products/:id', (req, res) => {
  let id = req.params.id;
  let deleteQuery = `DELETE FROM mykea.items WHERE id = ${id}`

  cassie.execute(deleteQuery)
    .then(() => {
      return res.json(`Item with ID: ${id} deleted`);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(400);
    })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})



module.exports = app;