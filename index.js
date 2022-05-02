const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const app = express();
// dbUser1
// q0igupFLD0b9xuiF

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4i2xt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productsCollection = client.db("store").collection("products");

    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.get('/inventory/:id', async(req,res) =>{
      const id= req.params.id;
      const query={_id: ObjectId(id)};
      const product= await productsCollection.findOne(query);
      res.send(product); 
    });
    // update user
    app.put('/inventory/:id', async(req,res) =>{
      const id = req.params.id;
      const updateQuantity=req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updateDoc= {
        $set: {
          quantity:updateQuantity.addQuantity 
        }
      };

      const result= await productsCollection.updateOne(filter,updateDoc,options);
      res.send(result)
    })






  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running furniture server");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
