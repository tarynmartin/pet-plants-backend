# Node Express & Typescript Starter for 2022
*"A minimally opinionated typescript & express starter for 2022"*
source: https://github.com/redcartel/node-express-typescript-starter-2022

## Firebase Admin SDK Setup:
1. copy `.env.sample` to `.env`
2. navigate to the [Pet Plants Project](http://console.firebase.com) in the Firebase Console
3. Go to the Project Settings -> Service Accounts page
4. Click the `Generate new private key` button at the bottom to create and download a new service account key.
5. Open the downloaded key file (it is just a .json file). Delete all the line breaks so that it is a single long string (do NOT remove the \n characters from the private key field).
6. Copy this json string and paste it into the .env file as the value for the FB_SERVICE_ACCOUNT variable. wrap the string in single quotes, so it should look something like this: FB_SERVICE_ACCOUNT='{ "type": "service_account", "project_id": ...}'
7. Make sure the service account file is NOT uploaded to github, as it contains a private key. You can either delete this file, or just store it somewhere locally that won't be uploaded to github.
8. The `.gitignore` already includes the `.env` file, but make sure that the `.env` file is not uploaded to github for the same reason as 6 above.

This is all that's necessary for the Firebase Admin SDK to connect to the Firebase project and the Firestore Database.


## Usage:

`npm run dev` - Run the development server.

`npm test` - Run tests.

`npm run test:watch` - Run tests when files update.

`npm run build` - Builds the server.

`npm start` - Runs the server.
## Default endpoints:

A `GET` request to `/plants` will list all the plants in the Firestore database

A `GET` request to `/plants/scrape` will show a placeholder for where we can put the scraper

A `GET` request to `/` will respond with a description of the application.

A `POST` request to `/` will echo any json sent in the request body.

## Notes & ToDos:
- Figure out how we want to run the scraper - synchronously based on a request, or asynchronously through a different mechanism. The time it takes to scrape should influence this decision.
- Create a simple UI app to view / manage the data, and possibly kick-off the scraper

