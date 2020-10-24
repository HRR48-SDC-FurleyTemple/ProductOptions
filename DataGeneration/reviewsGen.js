const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if(isMainThread) {
  let work1 = new Worker(__filename);
  let work2 = new Worker(__filename);
  let work3 = new Worker(__filename);
  let work4 = new Worker(__filename);
  let work5 = new Worker(__filename);
  let work6 = new Worker(__filename);
  let work7 = new Worker(__filename);
} else {
  const workerId = require('worker_threads').threadId


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


let reviewsStream = fs.createWriteStream(`DataGeneration/reviews${workerId}.csv`);

let count;
  if (workerId === 1) {
    count = 1;
  }
  if (workerId === 2) {
    count = 2000001;
  }
  if (workerId === 3) {
    count = 4000001;
  }
  if (workerId === 4) {
    count = 6000001;
  }
  if (workerId === 5) {
    count = 8000001;
  }
  if (workerId === 6) {
    count = 10000001;
  }
  if (workerId === 7) {
    count = 12000001;
  }

var ok = true;
var reviewsMax = count + 1999999;
var reviews = count;


const createFakeReviews = () => {

  do {
    let reviewsArr = [];

    for (let i = 0; i < Math.floor(Math.random() * 8) + 1; i++) {
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
        productId: reviews,
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
      reviewsArr.push(review);
    }

    if (reviews === reviewsMax) {
      reviewsStream.write(reviewsCsvStringifier.stringifyRecords(reviewsArr));
    } else {
      ok = reviewsStream.write(reviewsCsvStringifier.stringifyRecords(reviewsArr));;
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

writeFakeReviews();
}
// module.exports = writeFakeReviews;