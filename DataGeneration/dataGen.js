const faker = require('faker');

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
    header: [
        {id: 'id', title: 'ID'},
        {id: 'title', title: 'TITLE'},
        {id: 'description', title: 'DESC'},
        {id: 'originalPrice', title: 'OGPRICE'},
        {id: 'salePrice', title: 'SALEPRICE'},
        {id: 'colors', title: 'COLORS'},
        {id: 'sizes', title: 'SIZES'},
        {id: 'liked', title: 'LIKED'},
        {id: 'inStock', title: 'INSTOCK'},
    ]
});
var fs = require('fs');


var stream = fs.createWriteStream('DataGeneration/items.csv')
stream.write(csvStringifier.getHeaderString())

var max = 100;
var i = 0;

const createFakeData = () => {
  var ok = true;

  do {
    let price = faker.commerce.price();
    let reviews = [];
    let colors = [];
    let sizes = [];



    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      colors.push(faker.commerce.color())
    }

    let sizeOptions = ['S', 'M', 'L', 'XL']
    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      sizes.push(sizeOptions[j]);
    }

    let dataObj = {
      id: i + 1,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      originalPrice: Math.floor(price),
      salePrice: Math.floor(price * 0.85),
      colors: colors,
      sizes: sizes,
      liked: false,
      inStock: Math.random() <= 0.2 ? 0 : Math.floor(Math.random() * 15000),
    }

    if (i === max) {
      stream.write(csvStringifier.stringifyRecords([dataObj]));
    } else {
      ok = stream.write(csvStringifier.stringifyRecords([dataObj]));;
    }
    i++;
  }
  while (i <= max && ok) {
    stream.once('drain', createFakeData);
  }
};

createFakeData();

// for (let j = 0; j <  1; j++) {

//   let review = [];
//   let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
//   let valueForMoney = Math.floor(Math.random() * 5 + 1);
//   let productQuality = Math.floor(Math.random() * 5 + 1);
//   let appearance = Math.floor(Math.random() * 5 + 1);
//   let worksAsExpected = Math.floor(Math.random() * 5 + 1);
//   let overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
//   let createdAt = faker.date.past();
//   let iRecommendThisProduct = faker.random.boolean();
//   let header = faker.lorem.words();
//   let body = faker.lorem.paragraphs();

//   review.push(easeOfAssembly);
//   review.push(valueForMoney);
//   review.push(productQuality);
//   review.push(appearance);
//   review.push(worksAsExpected);
//   review.push(overallRating);
//   review.push(createdAt);
//   review.push(iRecommendThisProduct);
//   review.push(header);
//   review.push(body);

//   reviews.push(review)
//   }




//manual stringification form

// const faker = require('faker');

// var fs = require('fs');



// const createFakeProducts = () => {
//   var ok = true;
//   var stream = fs.createWriteStream('DataGeneration/items.csv')

//   let header = `ID,TITLE,DESC,OGPRICE,SALEPRICE,COLORS,SIZES,LIKED,INSTOCK\n`

//   var max = 100;
//   var i = 0;

//   stream.write(header, 'utf8');

//   do {
//     let price = faker.commerce.price();
//     let reviews = [];
//     let colors = [];
//     let sizes = [];

//     for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
//       colors.push(faker.commerce.color())
//     }

//     let sizeOptions = ['S', 'M', 'L', 'XL']
//     for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
//       sizes.push(sizeOptions[j]);
//     }

//     let dataObj = {
//       id: i + 1,
//       title: faker.lorem.word(),
//       description: faker.lorem.sentence(),
//       originalPrice: Math.floor(price),
//       salePrice: Math.floor(price * 0.85),
//       colors: colors,
//       sizes: sizes,
//       liked: false,
//       inStock: Math.random() <= 0.2 ? 0 : Math.floor(Math.random() * 15000),
//     }

//     let dataStr = `${dataObj.id},\
//     ${dataObj.title},\
//     ${dataObj.description},\
//     ${dataObj.originalPrice},\
//     ${dataObj.salePrice},\
//     "${dataObj.colors.join()}",\
//     "${dataObj.sizes.join()}",\
//     ${dataObj.liked},\
//     ${dataObj.inStock}\n`

//     if (i === max) {
//       stream.write(dataStr);
//     } else {
//       ok = stream.write(dataStr);
//     }
//     i++;
//   }
//   while (i <= max && ok) {
//     stream.once('drain', createFakeProducts);
//   }
// };

// createFakeProducts();


// const createFakeReviews = () => {
//   var ok = true;
//   var stream = fs.createWriteStream('DataGeneration/reviews.csv')

//   let header = `PRODID,EASEOFASSEMBLY,VALUEFORMONEY,PRODUCTQUALITY,APPEARANCE,WORKSASEXPECTED,OVERALL,CREATEDAT,RECOMMENDED,HEADER,BODY\n`

//   var max = 100;
//   var i = 0;

//   stream.write(header, 'utf8');


//   do {

//     let review = {
//       productId: Math.ceil(i+1/5),
//       easeOfAssembly : Math.floor(Math.random() * 5 + 1),
//       valueForMoney : Math.floor(Math.random() * 5 + 1),
//       productQuality : Math.floor(Math.random() * 5 + 1),
//       appearance : Math.floor(Math.random() * 5 + 1),
//       worksAsExpected : Math.floor(Math.random() * 5 + 1),
//       overallRating : Math.floor((this.easeOfAssembly + this.valueForMoney + this.productQuality + this.appearance + this.worksAsExpected) / 5),
//       createdAt : faker.date.past(),
//       iRecommendThisProduct : faker.random.boolean(),
//       header : faker.lorem.words(),
//       body : faker.lorem.paragraphs()
//     }

//     let dataStr = `${review.productId},\
//     ${review.easeOfAssembly},\
//     ${review.valueForMoney},\
//     ${review.productQuality},\
//     ${review.appearance},\
//     ${review.worksAsExpected},\
//     ${review.overallRating},\
//     ${review.createdAt},\
//     ${review.iRecommendThisProduct},\
//     ${review.header},\
//     ${review.body}\n`

//     if (i === max) {
//       stream.write(dataStr);
//     } else {
//       ok = stream.write(dataStr);
//     }
//     i++;
//   }
//   while (i <= max && ok) {
//     stream.once('drain', createFakeReviews);
//   }
// };

// // createFakeReviews();

