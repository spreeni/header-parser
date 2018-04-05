// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
var parser = require('ua-parser-js')

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get("/api", (req, res) => {
  var language = req.headers["accept-language"].split(',')[0]
  var software = parser(req.headers['user-agent'])
  var ip = req.headers['x-forwarded-for'].split(',')[0] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
  var object = {"ip": ip, "language": language, "software": software.os.name + ' ' + software.os.version}
  res.send(JSON.stringify(object))
})

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})