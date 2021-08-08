// Retrieve environment variables
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//Set up app
const express = require('express')
const app = express()
const port = 3000

//Set up mongoose connection
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.eujj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
  try {
    const collection = client.db("leaderboard").collection("Collection0");
    // perform actions on the collection object
    const cursor = collection.find()
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.log)
  } finally {
    client.close();
  }


});


//Set up routing
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
