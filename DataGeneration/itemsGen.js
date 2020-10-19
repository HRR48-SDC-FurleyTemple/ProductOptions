const faker = require('faker');
var fs = require('fs');

const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const itemsCsvStringifier = createCsvStringifier({
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

let itemsStream = fs.createWriteStream('DataGeneration/items.csv');

var ok = true;
var itemsMax = 10000000;
var items = 0;

const createFakeItems = () => {

  do {
    let price = faker.commerce.price();
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
      id: items + 1,
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      originalPrice: Math.floor(price),
      salePrice: Math.floor(price * 0.85),
      colors: colors,
      sizes: sizes,
      liked: false,
      inStock: Math.random() <= 0.2 ? 0 : Math.floor(Math.random() * 15000),
    }

    if (items === itemsMax) {
      itemsStream.write(itemsCsvStringifier.stringifyRecords([dataObj]));
    } else {
      ok = itemsStream.write(itemsCsvStringifier.stringifyRecords([dataObj]));;
    }
    items++;
  }
  while (items <= itemsMax && ok) {
    itemsStream.once('drain', createFakeItems);
  }
};

let writeFakeItems = async () => {

  await itemsStream.write(itemsCsvStringifier.getHeaderString());
  await createFakeItems();

}

module.exports = writeFakeItems;