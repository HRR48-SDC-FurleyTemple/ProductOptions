# New Document# Product Options

Module that provides an interface for a user to view and change product options, like size, quantity, color, etc.

### For a demo of the module, please see: https://recordit.co/thCIuhpfNv

------

## Installation / Setup

### Setup -- These steps only need to be completed the first time this module is to be used.

1. Ensure that the repo is cloned locally for use. Also ensure that Cassandra DB is downloaded and started, as it is the database that this module uses.
1. From the root of this repo, run `npm install` to install dependencies.
1. Following the installation of all dependencies, run `npm run build` to generate the script bundle that the module will use.
1. Run `npm run genCSV` to generate two CSV files -- `items.csv` and `reviews.csv`. These will be used to seed our database. Bear in mind that this command is generating at least 30,000,000 results, so it will have to run for a few minutes. It wouldn't be unreasonable to go get a drink or snack during this time. Also be aware that these files are not small! Have at least 4 GB of available hard drive space for them.
1. You will have to do some manual work in Cassandra to complete the database setup. Don't be intimidated! You can copy and paste lines. First, in your command line, while Cassandra is running, enter `cqlsh` to interact with Cassandra, then when you see something like this:

> Connected to Test Cluster at 127.0.0.1:9042.\
> [cqlsh 5.0.1 | Cassandra 4.0 | CQL spec 3.4.5 | Native protocol v4]\
> Use HELP for help.\
> cqlsh>

enter this command: `CREATE KEYSPACE mykea WITH REPLICATION = { 'class' :    'SimpleStrategy', 'replication_factor' : 1 };`

6. While Cassandra is started and the `mykea` keyspace has been created, run `npm run cassieSetup` to create the tables required by the module.
7. Once the Cassandra setup is complete and the CSVs are generated, within the `cqlsh` command line, enter this command: `COPY mykea.items (id, title, description, "originalPrice", "salePrice", colors, sizes, liked, "inStock") FROM 'DataGeneration/items.csv' WITH DELIMITER=',' AND HEADER=TRUE ;`. Expect this to take several minutes, as it is copying millions of lines into the database.
8. When that is complete, enter this command as well: `COPY mykea.reviews (id, "easeOfAssembly", "valueForMoney", "productQuality", appearance, "worksAsExpected", "overallRating", "createdAt", "iRecommendThisProduct", header, body) FROM 'DataGeneration/reviews.csv' WITH DELIMITER=',' AND HEADER=TRUE ;`. Again, budget several minutes. However, once this is finished, your setup is complete! You may delete the CSV files if you would like, and you may close `cqlsh`. You may move on to the startup steps below!

### Startup -- after the above setup steps have been completed successfully at least once, the user can simply:

1. Ensure that Cassandra is started.
1. Run the command `npm start`. The terminal should log `server listening on port 3000`. Incidentally, if users wish to change the port that this module uses, this can be done in `server/server.js` by simply changing the value of the `port` variable.
1. After the server is running, users can navigate to `http://localhost:3000` (or whichever port the user chooses, if that is changed) to view the default page and append the `/products/:id` endpoint to that URL, where `:id` is the ID of a product the user wishes to view. The database seeding will populate 10,000,000 products and IDs automatically. The root endpoint will default to `/products/1`.

------

## CRUD Operations / Using the API

### GET

There are two ways to use a GET request with this module. The first is the standard use-case, and the second will be practically meaningless in normal usage.

- `/products/:id`\
This endpoint will update the module with the information for the product matching the ID passed in. This includes data like size, color, reviews, etc.

- `/api/productOptions/products/:id`\
This endpoint will directly show the JSON data of the product matching the ID passed in. This will not be useful to users and is primarily for testing.

### POST

A POST request can involve either creating a new item or adding a review to an existing item.

- `/api/productOptions/products`\
Now REST compliant! This endpoint will create a new item using the next available ID. Note that a new item cannot currently be generated with reviews, and that these will have to be posted separately. A new item should have the properties as the body of the request and match this schema:

      title: String,
      description: String,
      price: {
        originalPrice: Number,
        salePrice: Number
      },
      colors: [String],
      sizes: [String],
      liked: Boolean,
      inStock: Number

- `/api/productOptions/products/:id/reviews`\
This endpoint will push a new review to the reviews property of the item with the matching ID. Reviews should match this schema:

      overallRating: { type: Number, min: 1, max: 5},
      easeOfAssembly: { type: Number, min: 1, max: 5},
      valueForMoney: { type: Number, min: 1, max: 5},
      productQuality: { type: Number, min: 1, max: 5},
      appearance: { type: Number, min: 1, max: 5},
      worksAsExpected: { type: Number, min: 1, max: 5},
      header: String,
      body: String,
      createdAt: Date (as a string),
      iRecommendThisProduct: Boolean

### PUT
A PUT request can be used to update an item with a given ID.

- `/api/productOptions/products/:id`\
This endpoint will update the item with the given ID, overwriting any existing data with new data in the body of the request. Information that is not in the new request body will not be affected! This can be used to update one or more properties of an item without altering existing data beyond what a user seeks to change.

### DELETE
~~This API supports two different DELETE operations!~~ The current form of this API supports only the ability to delete a single item at a time. Given the size of the database, a deletion of over 10,000,000 items would be time-consuming, and re-seeding would be extremely time consuming.

- `/api/productOptions/products/:id`\
This endpoint deletes the item with the given ID.

- ~~`/api/productOptions/products/:id/ALL`\
This endpoint deletes ALL items from the database. Use with caution!~~