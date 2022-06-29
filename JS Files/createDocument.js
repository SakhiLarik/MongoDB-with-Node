const { MongoClient } = require("mongodb");
const path = require("path");
const fs = require("fs");

const uri = "mongodb://localhost:27017";
const connectDB = async function () {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Creating Single Document
    await createSingleDocument(client, "school", "students", {
      name: "sakhawat",
      email: "sakhawat@student.gmail.com",
      age: 19,
      gender: "Male",
    });

    // Creating multiple documents
    // let dataFile = fs.readFileSync(path.join(__dirname, "users.json"), "utf-8");
    // dataFile = JSON.parse(dataFile);
    // await createMultipleDocument(client, "school", "students", dataFile);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};
const createSingleDocument = async function (
  client,
  dbName,
  collectionName,
  data
) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .insertOne(data);
    console.log("Single Data Inserted Successfully " + result.insertedId);
  } catch (e) {
    console.error(e);
  }
};
const createMultipleDocument = async function (
  client,
  dbName,
  collectionName,
  data
) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .insertMany(data);
    console.log("Inserted " + result.insertedCount + " documents");
    for (i in result.insertedIds) {
      console.log("Insrted Ids = " + result.insertedIds[i]);
    }
  } catch (e) {
    console.errlor(e);
  }
};
connectDB().catch(console.error());
