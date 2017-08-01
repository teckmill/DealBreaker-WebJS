/**
 *
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

/*
  const fs = require('fs');
  const expressValidator = require('express-validator');
*/
const dbConfig = require('./config/db')// config file
const testDBConfig = require('./test/config-debug.spec.js')// test db config file

// Database - Mongoose Setup
if (process.env.NODE_ENV !== 'test') {
  console.log('Not testing')

  mongoose.connect(dbConfig.database)

  // Testing Connection
  mongoose.connection.on('connected', () => {
    console.log('DB connection successful ' + dbConfig.database)
  })
  // Error checking on DB
  mongoose.connection.on('error', (err) => {
    console.log('DB Error: ' + err)
  })
} else if (process.env.NODE_ENV === 'test') {
  console.log('Testing')

  mongoose.connect(testDBConfig.database) // config file
  // Testing Connection
  mongoose.connection.on('connected', () => {
    console.log('DB connection successful ' + testDBConfig.database)
  })
  // Error checking on DB
  mongoose.connection.on('error', (err) => {
    console.log('DB Error: ' + err)
  })
}

const app = express()
const port = 8000
const users = require('./routes/users')
const profiles = require('./routes/profiles')
const rejected = require('./routes/rejected')
const pending = require('./routes/pending')
const confirmed = require('./routes/confirmed')
const images = require('./routes/images')
const browse = require('./routes/browse')
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config/s3Config.json')

// CORS MiddleWare
app.use(cors())

// Set Static Angular Folder Framework
app.use(express.static(path.join(__dirname, 'public')))

// BodyParser Middleware
app.use(bodyParser.json())

// Passport MiddleWare - passport-jwt
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

// Requests to domain/users => users file
app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/reject', rejected)
app.use('/api/pending', pending)
app.use('/api/confirm', confirmed)
// app.use('/', profiles);
app.use('/api/images', images)
app.use('/api/browse', browse)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// server on port:
app.listen(port, () => {
  console.log('Server started on port ' + port)
})

module.exports = app
