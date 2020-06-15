// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date", function (req, res) {
  const date = req.params.date;
if(!/\d{4}-\d{2}-\d{2}/.test(date) && !/\d{13}/.test(date)){ 
  const err = {error : "Invalid Date"}
  res.json(err)
}
  else if(/\d{13}/.test(date)){
   // console.log(date.substring(0,11))
    const data = new Date(parseInt(date))
    res.send({"unix": data.getTime(), "utc" : data.toUTCString() }) 
  }
  else{
  const prob = new Date(date)
  res.send({"unix": prob.getTime(), "utc" : prob.toUTCString() }) 
  }
});

app.get("/api/timestamp",(req,res) => { 
  const date = new Date();
  res.send({"unix": date.getTime(), "utc" : date.toUTCString() }) 
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});