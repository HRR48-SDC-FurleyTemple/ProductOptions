const express = require('express');
const app = express();
const cassie = require('../CassandraDB/index.js')
const path = require('path');


app.use(express.json())
app.use('/products', express.static('./client/dist'))
app.use('/', express.static('./client/dist'))

let highest = 10000000;


let searchForHighest = () => {
  let tryHighest = cassie.execute(`SELECT * FROM mykea.items WHERE id = ${highest}`).then(results => results);

  tryHighest
  .then((results) => {
    console.log(highest)
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
      console.log(err);
      res.json(err);
    })
})

app.post('/api/productOptions/products/:id/reviews', (req, res) => {
  const { overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct } = req.body;
  let id = req.params.id;



  // db.Item.findOne({ id })
  // .then((item) => {

  //   item.reviews.push({ overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, header, body, createdAt, iRecommendThisProduct });
  //   item.save();
  //   res.json(item);
  // })
})

app.post('/api/productOptions/products/:id', (req, res) => {
  // find highest ID value -- does not increment properly automatically, so an id in the endpoint is necessary
  // to properly create a new item
  // var findQuery = db.Item.findOne({}, {_id:0}).sort('-id').select('id').exec((err, doc) => { })
      const { price, colors, sizes, title, description, liked, inStock, reviews } = req.body;
      let id = req.params.id;
      // const newItem = new db.Item({ price, colors, sizes, title, description, liked, inStock, reviews, id})
      //   newItem.save((err, result) => {
      //     if (err) {
      //       console.log(err);
      //       res.json(err);
      //     }
      //     res.send(result);
      //   })
  })

  app.put('/api/productOptions/products/:id', (req, res) => {
    // db.Item.findOneAndUpdate({'id': req.params.id}, {$set: req.body})
    // .then(result => {
    //   res.json(result);
    // })
  })

app.delete('/api/productOptions/products/ALL', (req, res) => {
  // db.Item.deleteMany({})
  // .then((results) => {
  //   res.json(results);
  // })
})

app.delete('/api/productOptions/products/:id', (req, res) => {
  // db.Item.deleteOne({id: req.params.id})
  // .then((results) => {
  //   res.json(results);
  // })
})

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})



module.exports = app;