const faker = require('faker');
var fs = require('fs');

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const reviewsCsvStringifier = createCsvStringifier({
    header: [
        {id: 'productId', title: 'PRODID'},
        {id: 'easeOfAssembly', title: 'EASEOFASSEMBLY'},
        {id: 'valueForMoney', title: 'VALUEFORMONEY'},
        {id: 'productQuality', title: 'PRODUCTQUALITY'},
        {id: 'appearance', title: 'APPEARANCE'},
        {id: 'worksAsExpected', title: 'WORKSASEXPECTED'},
        {id: 'overallRating', title: 'OVERALL'},
        {id: 'createdAt', title: 'CREATEDAT'},
        {id: 'iRecommendThisProduct', title: 'RECOMMENDED'},
        {id: 'header', title: 'HEADER'},
        {id: 'body', title: 'BODY'},
    ]
});


let reviewsStream = fs.createWriteStream('DataGeneration/reviews.csv');

var ok = true;
var reviewsMax = 20000000;
var reviews = 0;


const createFakeReviews = () => {

  do {

    let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
    let valueForMoney = Math.floor(Math.random() * 5 + 1);
    let productQuality = Math.floor(Math.random() * 5 + 1);
    let appearance = Math.floor(Math.random() * 5 + 1);
    let worksAsExpected = Math.floor(Math.random() * 5 + 1);
    let overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
    let createdAt = faker.date.past();
    let iRecommendThisProduct = faker.random.boolean();
    let header = faker.lorem.words();
    let body = faker.lorem.sentence();

    let review = {
      productId: Math.ceil((reviews + 1)/2),
      easeOfAssembly : easeOfAssembly,
      valueForMoney : valueForMoney,
      productQuality : productQuality,
      appearance : appearance,
      worksAsExpected : worksAsExpected,
      overallRating : overallRating,
      createdAt : createdAt,
      iRecommendThisProduct : iRecommendThisProduct,
      header : header,
      body : body
    }

    if (reviews === reviewsMax) {
      reviewsStream.write(reviewsCsvStringifier.stringifyRecords([review]));
    } else {
      ok = reviewsStream.write(reviewsCsvStringifier.stringifyRecords([review]));;
    }
    reviews++;
  }
  while (reviews <= reviewsMax && ok) {
    reviewsStream.once('drain', createFakeReviews);
  }
};

let writeFakeReviews = async () => {

  await reviewsStream.write(reviewsCsvStringifier.getHeaderString());
  await createFakeReviews();

}

module.exports = writeFakeReviews;