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
        {id: 'reviews', title: 'REVIEWS'},
    ]
});
var fs = require('fs');



var stream = fs.createWriteStream('DataGeneration/data.csv')
var max = 10000000
var i = 0;


const createFakeData = () => {
  var ok = true;

  do {
    let price = faker.commerce.price();
    let reviews = [];
    let colors = [];
    let sizes = [];

    for (let j = 0; j < Math.floor(Math.random() * 8); j++) {
      let easeOfAssembly = Math.floor(Math.random() * 5 + 1);
      let valueForMoney = Math.floor(Math.random() * 5 + 1);
      let productQuality = Math.floor(Math.random() * 5 + 1);
      let appearance = Math.floor(Math.random() * 5 + 1);
      let worksAsExpected = Math.floor(Math.random() * 5 + 1);
      let overallRating = Math.floor((easeOfAssembly + valueForMoney + productQuality + appearance + worksAsExpected) / 5);
      let createdAt = faker.date.past();
      let iRecommendThisProduct = faker.random.boolean();
      let header = faker.lorem.words();
      let body = faker.lorem.paragraphs()

      reviews.push({ overallRating, easeOfAssembly, valueForMoney, productQuality, appearance, worksAsExpected, createdAt, iRecommendThisProduct, header, body})
    }

    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
      colors.push(faker.commerce.color())
    }

    let sizeOptions = ['S', 'M', 'L', 'XL']
    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      sizes.push(sizeOptions[j]);
    }

    let dataObj = {
      id: i,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      originalPrice: price,
      salePrice: price * 0.85,
      colors: colors,
      sizes: sizes,
      liked: false,
      inStock: Math.random() <= 0.2 ? 0 : Math.floor(Math.random() * 15000),
      reviews: JSON.stringify(reviews)
    }

    if (i === max) {
      stream.write(csvStringifier.stringifyRecords([dataObj]));
    } else {
      ok = stream.write(csvStringifier.stringifyRecords([dataObj]));
    }
    i++;
  }
  while (i <= max && ok) {
    stream.once('drain', createFakeData);
  }
};

createFakeData();


// writer.write(dataObj);