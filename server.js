// @ts-nocheck
const fs = require('fs')
const https = require('https')
const express = require('./node_modules/express')
const cors = require('./node_modules/cors')
const routes = require('./routes')

// load variables from .env file
require('dotenv').config()

const key = fs.readFileSync('encryption/serverKey.pem')
const cert = fs.readFileSync('encryption/certificate.crt')
const ca = fs.readFileSync('encryption/ca.ca-bundle')
const passphrase = process.env.PASSPHRASE

const httpsOptions = {
  key,
  cert,
  ca,
  passphrase,
}

// definiere express server
const app = express()

// due to the error
/*
Access to XMLHttpRequest at 'http://localhost:3000/access' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
// cors is used
app.use(cors())

const port = process.env.PORT || 8000

// load routes
routes(app)

// start express server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`log-viewer-backend listening at https://localhost:${ port }`)
})
