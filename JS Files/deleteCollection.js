const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db = "school";
const collection = "courses";
const connectDB = async function () {
  try {
    if (await client.connect()) {
      deleteCollection(client, db, collection);
      console.log("Connected To Database");
    } else return;
  } catch (e) {
    console.error(e);
  }
};
const deleteCollection = async function (client, dbName, collectionName) {
  try {
    const deleteQ = await client.db(dbName).collection(collectionName).drop();
    console.log(deleteQ);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};
connectDB().catch(console.error());


