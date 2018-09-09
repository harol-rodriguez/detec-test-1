const express = require('express')
const mysql = require('mysql')
// const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const config = require('./config')

// Require API routes
const users = require('./routes/users');
const auth = require('./routes/auth');

// Create express instnace
// const db = mysql.createConnection(config.db)
const app = express()

// Import API Routes
app.use(users);
// app.use(auth({db, express, bcrypt, jwt, jwtToken: config.jwtToken}));
app.use(auth);

// Body Parser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
