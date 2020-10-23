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

  let itemsStream = fs.createWriteStream(`DataGeneration/items${workerId}.csv`);

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
  var itemsMax = count + 1999999;
  var items = count;

  const createFakeItems = () => {

    do {
      let price = Math.floor(faker.commerce.price());
      let colors = [];
      let sizes = [];

      for (let j = 0; j < Math.floor(Math.random() * 6); j++) {
        colors.push(faker.commerce.color())
      }

      let sizeOptions = ['S', 'M', 'L', 'XL']
      for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        sizes.push(sizeOptions[j]);
      }

      let dataObj = {
        id: items,
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        originalPrice: price,
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

  writeFakeItems();

}
