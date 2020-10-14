## Product Options

Module that provides interfact for user to view and change product options, like size, quantity, color, etc.

------

## Installation / Setup

1. Ensure that the repo is cloned locally for use. Also ensure that MongoDB is downloaded and started, as it is the database that this module uses.
1. From the root of this repo, run `npm install` to install dependencies.
1. Following the installation of all dependencies, run `npm run build` to generate the script bundle that the module will use.
1. Lastly, while MongoDB is started and available, run `npm run postinstall` to seed the database.

> These setup steps are only necessary the first time a user attempts to use this module. Assuming these steps have been completed successfully at least once, the user can simply:

1. Ensure that MongoDB is started.
1. Run the command `npm start`. The terminal should log `server listening on port 3000`. Incidentally, if users wish to change the port that this module uses, this can be done in `server/server.js` by simply changing the value of the `port` variable.
1. After the server is running, users can navigate to `http://localhost:3000` (or whichever port the user chooses, if that is changed) to view the default page and append the `/api/productOptions/products/:id` endpoint to that URL, where `:id` is the ID of a product the user wishes to view. The database seeding will populate up to 100 products and IDs automatically.

------

## CRUD Operations / Using the API