const itemWrite = require('./itemsGen.js');
const reviewWrite = require('./reviewsGen.js');

const genData = async () => {
  await itemWrite();
  await console.log('items written, moving on to CSVs');
  await reviewWrite();
  await console.log('CSVs generated!');
}

genData();