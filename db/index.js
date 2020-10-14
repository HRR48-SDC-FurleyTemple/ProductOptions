const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mykea', { useNewUrlParser: true, useUnifiedTopology: true })

const reviewSchema = mongoose.Schema({
  overallRating: { type: Number, min: 1, max: 5},
  easeOfAssembly: { type: Number, min: 1, max: 5},
  valueForMoney: { type: Number, min: 1, max: 5},
  productQuality: { type: Number, min: 1, max: 5},
  appearance: { type: Number, min: 1, max: 5},
  worksAsExpected: { type: Number, min: 1, max: 5},
  header: String,
  body: String,
  createdAt: Date,
  iRecommendThisProduct: Boolean
 })

 const itemSchema = mongoose.Schema({
  title: String,
  description: String,
  price: {
    originalPrice: Number,
    salePrice: Number
  },
  colors: [String],
  sizes: [String],
  liked: Boolean,
  inStock: Number,
  reviews: [reviewSchema],
  id: String
 })

let Item = mongoose.model('Item', itemSchema);


module.exports.Item = Item;
module.exports.mongoose = mongoose;