# To-Do List  [![Build Status](https://travis-ci.org/janhartman/sp-todo-list.svg?branch=master)](https://travis-ci.org/janhartman/sp-todo-list)

This app was created as a project in the Web Programming course. It is available at https://sp-todo-list.herokuapp.com/.
The app is written in `Node.js` using the framework `Sails`.


## Installation

### Database
The app needs a MySQL database for persisting data. Other relational databases can be used, but
need to be specified in `config/connections.js` and the `install/databaseProvision.js` script needs 
to be modified to suit the chosen type of database.

### Environment variables
These are only necessary if you set `NODE_ENV` to `production`.

The following environment variables need to be present in order to start the app without any issues.
- `DB_HOST`: hostname of the database
- `DB_USERNAME`: username for the database
- `DB_PASSWORD`: password for the database

These variables are optional:
- `ROOT_PASSWORD`: an admin user is created in the database with the email root@to.do and this password (default `iamroot`)
- `PORT`: the app starts listening on this port (default 80)

### Node.js
A `Node.js` installation is required (recommended version ^4.0.0).

The following commands are necessary for deployment:   
- install dependencies: `npm install`  
- start the app: `npm start` (`node app.js` does not provision the database)

Testing:
- `npm test` performs a simple test (check if the app starts correctly)

### Default settings
If none of the environment variables are provided, 
the app starts in development mode (listens on port 80, connects to a MySQL server @`localhost`
with the username and password set to `root`)