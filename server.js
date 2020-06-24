const express = require('express');
const bodyParser = require('body-parser');// initialize our express app
const port = 4000;
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://xdong82:3bAkrvlTsXCHWqVD@cluster0-pxsle.mongodb.net/Music2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(client);
  // perform actions on the collection object
  client.close();
});


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
