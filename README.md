# Weatherbe
Weatherbe is a full stack web application project that helps people with planning outdoor activities by analysing weather forecast. 
## Getting Started
These instructions will show you how to get a copy of the project running on your local machine:
## Prerequisites

Required by back-end:
* [Node.js](https://nodejs.org)

Required by front-end:
* [Angular CLI](https://cli.angular.io)

## Installation

Step 1 - clone the repo:
`git clone https://cseegit.essex.ac.uk/ce301/kloza_b/capstone_project.git`

Step 2 - open terminal and cd into back-end directory:
`cd /*YOUR_PATH*/capstone_project/back-end/`

Step 3 - install all required Node.js dependencies and modules (Express.js, body-parser, request):
`npm install`

(optional) for some reason sometimes cors module doesn't load properly and a following command needs to be used:
`npm install cors --save`

Step 4 - run the back-end server:
`node index.js`
If everything works correctly, you should see a following message in the terminal window:
`Server running on port: 3000`

Step 5 - open new terminal window and cd into ../front-end/Weatherbe:
`cd /*YOUR_PATH*/capstone_project/front-end/Weatherbe`

Step 6 - install all required Angular dependencies and modules:
`npm update`

Step 7 - run the front-end server and open it in a browser:
`ng serve --open'

If everything works correctly, you should be able to see the live website on `http://localhost:4200/`:

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Built with:
* [Node.js](https://nodejs.org)
* [Angular](https://angular.io)
* [Express](https://expressjs.com)
* [MongoDB](https://www.mongodb.com)
* [Bootstrap](https://getbootstrap.com)

## Author:
Bartlomiej Kloza - CE301 Project
