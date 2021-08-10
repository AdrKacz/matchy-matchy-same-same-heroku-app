// Retrieve environment variables
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//Set up app
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const app = express();

const devPort = 3000;
const port = process.env.PORT || devPort;

//Set up mongoose connection
const { MongoClient } = require('mongodb');

const devUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.eujj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI || devUri;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Set up middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

//Set up routing
app.post('/insert', async (req, res) => {
  const resObject = {};
  try {
    // TODO: Verify score
    if (req.body.score && req.body.name) {
      await client.connect();
      const collection = client.db("leaderboard").collection("Collection0");
      const insertResult = await collection.insertOne({score: parseInt(req.body.score), name: req.body.name.slice(0, 3).padEnd(3).toUpperCase()});
      resObject.result = insertResult;
      console.log('Insert:')
      console.log(insertResult)
    } else {
      resObject.result = 'Request shall have a score and a name.';
    }
  } finally {
    client.close();
    res.json(resObject);
  };
});

app.get('/scan', async (req, res) => {
  const resObject = {};
  try {
    await client.connect();
    const collection = client.db("leaderboard").collection("Collection0");
    const findResult = await collection.find({}).toArray()
    resObject.result = findResult;
    console.log('Scan:')
    console.log(findResult)
  } finally {
    client.close();
    res.json(resObject);
  };
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
