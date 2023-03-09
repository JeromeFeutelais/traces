import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mongooseConnect from './helpers/dbConnect'
import expressSession from 'express-session'
const MongoDBStore = require('connect-mongodb-session')(expressSession);
console.log("bonjour")
import * as userService from './services/userService'
import mongoString from './helpers/dbConnect'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import User from './models/user'

declare module "express-session" {
  interface SessionData {
    user?: any //Todo: define user type
  }
}

dotenv.config()

mongooseConnect.dbconnect()

const app = express()
const http = require('http').Server(app)

const sessionSecret = process.env.sessionSecret ?? "set a secret"

/**
 * set the bodyparser to get info from body of POST request
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

/**
 * set Pug has the view engine
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(
  expressSession({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: new MongoDBStore({
        collection: 'userSessions',
        uri:
          mongoString.mongostring,
      }),
    }),
);
  
/**
 * set up routes
 */
app.use('/', require('./routes'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  //err.message = "404"
  next(err)
})


  





// production error handler
// no stacktraces leaked to user
app.use(function (err:Error, req:express.Request, res:express.Response, next:express.NextFunction) {
  res.status(500)
  res.send(err.message)
  res.end()
})
let port = 4000
var server = http.listen(process.env.PORT || port, () => {
  console.log('Traces server is running on port', server.address().port)
})