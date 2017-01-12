# Installation

## Database
The app needs a MySQL database for persisting data.

The following environment variables need to be present in order to start the app without any issues.
- `DB_HOST`: hostname of the database
- `DB_USERNAME`: username for the database
- `DB_PASSWORD`: password for the database
- `ROOT_PASSWORD`: an admin user is created in the database with the email root@to.do and this password

In addition, set the `NODE_ENV` environment variable to `production`.


## Node.js
A `Node.js` installation is required (recommended version ^4.0.0).

The following commands are necessary for deployment:   
- install dependencies: `npm install`  
- start the app: `npm start`
