
const express = require("express");
const path = require("path"); 
const dotenv = require("dotenv");

dotenv.config();

const app = express(); //creating an Express app
const port = process.env.PORT || "8888";

//MongoDB 
const { MongoClient } = require("mongodb");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
const client = new MongoClient(dbUrl);

//set up Express app to use Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up public folder path for static files
app.use(express.static(path.join(__dirname, "public")));


app.get("/", async (request, response) => {
  let links = await getAllLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
  let links = await getAllLinks();
  response.render("about", { title: "About", menu: links });
});
app.get("/products", async (request, response) => {
    let links = await getAllLinks();
    let dragonfruits = await getAllFruit();
    response.render("products", { title: "Products", menu: links, dragfruit: dragonfruits });
  });


//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//Mongo functions
async function connection() {
  db = client.db("simondb");
  return db;
}
async function getAllLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({}); 
  res = await results.toArray();
  return res;
}

async function getAllFruit() {
    db = await connection();
    let results = db.collection("dragonfruits").find({}); 
    res = await results.toArray();
    return res;
  }


