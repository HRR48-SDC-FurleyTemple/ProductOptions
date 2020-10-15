const faker = require('faker');

// generate an array of objects representing items
// items also have reviews property which is a random array of reviews
const createFakeData = () => {

  let dataArray = [];
  let samePrice = true;

  // TODO: set to 10000000 once databases are figured out
  for (let i = 0; i < 1000; i++) {
    let reviews = [];

    for (let j = 0; j < Math.floor(Math.random() * 15); j++) {
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

    let title = faker.lorem.word();

    let description = faker.lorem.sentence();

    // Random prices w/ sales

    let price;
    let currentPrice = faker.commerce.price();

    if (samePrice) {

       price = {
        originalPrice: currentPrice,
        salePrice: currentPrice
      }

    } else {
        let newPrice = faker.commerce.price();
        let higherPrice;
        let lowerPrice;

        if (newPrice > currentPrice) {
          higherPrice = newPrice;
          lowerPrice = currentPrice;
        } else {
          higherPrice = currentPrice;
          lowerPrice = newPrice;
        }
        price = {
          originalPrice: higherPrice,
          salePrice: lowerPrice
        }
      }

    samePrice = !samePrice

    // Random colors
    let colors = [];
    for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
      colors.push(faker.commerce.color())
    }

    // Random Sizes
    let sizes = [];
    let sizeOptions = ['Small', 'Medium', 'Large', 'XL']
    for (let j = 0; j < Math.floor(Math.random() * 4); j++) {
      sizes.push(sizeOptions[j]);
    }

    // All products start unliked
    let liked = false;

    let inStock;
    if (Math.random() <= 0.2) {
      inStock = 0;
    } else {
      inStock = Math.floor(Math.random() * 15000)
    }

    dataArray.push({ title, description, price, colors, sizes, liked, inStock, reviews});
    id++;
  }

  return dataArray;
};

// export this function to be used in whatever database file will be used for seeding
module.exports = createFakeData();
