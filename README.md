# Product Options

Module that provides interfact for user to view and change product options, like size, quantity, color, etc.

### For a demo of the module, please see: https://recordit.co/thCIuhpfNv

------

## Installation / Setup

1. Ensure that the repo is cloned locally for use. Also ensure that MongoDB is downloaded and started, as it is the database that this module uses.
1. From the root of this repo, run `npm install` to install dependencies.
1. Following the installation of all dependencies, run `npm run build` to generate the script bundle that the module will use.
1. Lastly, while MongoDB is started and available, run `npm run postinstall` to seed the database.

> These setup steps are only necessary the first time a user attempts to use this module. Assuming these steps have been completed successfully at least once, the user can simply:

1. Ensure that MongoDB is started.
1. Run the command `npm start`. The terminal should log `server listening on port 3000`. Incidentally, if users wish to change the port that this module uses, this can be done in `server/server.js` by simply changing the value of the `port` variable.
1. After the server is running, users can navigate to `http://localhost:3000` (or whichever port the user chooses, if that is changed) to view the default page and append the `/products/:id` endpoint to that URL, where `:id` is the ID of a product the user wishes to view. The database seeding will populate up to 100 products and IDs automatically. The root endpoint will default to `/products/1`.

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

- `/api/productOptions/products/:id`\
This endpoint will create a new item with a specified ID. A new item should have the properties as the body of the request and match this schema:

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

Note, however, that 'id' need not be sent in the body of the request, as it pulls from the URL endpoint!

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
      createdAt: Date,
      iRecommendThisProduct: Boolean

### PUT
A PUT request can be used to update an item with a given ID.

- `/api/productOptions/products/:id`\
This endpoint will update the item with the given ID, overwriting any existing data with new data in the body of the request. Information that is not in the new request body will not be affected! This can be used to update one or more properties of an item without altering existing data beyond what a user seeks to change.

### DELETE
This API supports two different DELETE operations!

- `/api/productOptions/products/:id`\
This endpoint deletes the item with the given ID.

- `/api/productOptions/products/:id/ALL`\
This endpoint deletes ALL items from the database. Use with caution!