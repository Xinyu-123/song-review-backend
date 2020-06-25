const express = require('express');
const bodyParser = require('body-parser');// initialize our express app
const port = 4000;
const app = express();
const posts = require('./routes/posts.routes')
require('dotenv/config')

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//Middlewares
app.use('/posts', posts)


app.get('/', (req, res) => {
  console.log(req.params);
  res.send('We are on Home');
})




app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
