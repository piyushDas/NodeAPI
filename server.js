//All the dependencies go at the top of the file
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var db             = require('./config/db');
const app            = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true })); // Express can’t process URL encoded forms on its own

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('Running on port ' + port);
  });
})
