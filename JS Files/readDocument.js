const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = "school";
const collection = "students";
const connectDB = async function () {
  try {
    await client.connect();
    // Read One Data from Document
    // readOne(client,db,collection,{name : {$ne : "sakhawat"}});

    // Read All Data from Document
    readAll(client,db,collection);

    // Read Data by matching query
    // readByQuery(client,db,collection,{name :"sakhawat"});

    // Read All By Limiting Data
    // readByLimit(client,db,collection,2);

    // Read All By Sorting Data
    // -1 = descending order, 1 = ascending
    // readBySort(client,db,collection,{age : 1});

    // Read All By Text Searching
    // client.db(db).collection(collection).createIndex({ name: "text" });
    // readByTextSearch(client, db, collection, "Sakhawat");
  } catch (e) {
    console.error(e);
  }
};
const readAll = async function (client, dbName, collectionName) {
  try {
    let result = await client.db(dbName).collection(collectionName).find();
    const data = await result.toArray();
    console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
    console.log("Close the connection ");
  }
};

const readOne = async function (client, dbName, collectionName, query) {
  try {
    let result = await client
      .db(dbName)
      .collection(collectionName)
      .findOne(query);
    // const data = await result.toArray();
    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
    console.log("Close the connection ");
  }
};

const readByQuery = async function (client, dbName, collectionName, query) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find(query);
    let data = await result.toArray();
    console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};
const readByLimit = async function (client, dbName, collectionName, limit) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find()
      .limit(limit);
    let data = await result.toArray();
    console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

const readBySort = async function (client, dbName, collectionName, sort) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find()
      .sort(sort);
    let data = await result.toArray();
    console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

const readByTextSearch = async function (
  client,
  dbName,
  collectionName,
  searchWithText
) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .find({ $text: { $search: `"\"${searchWithText}"\"` } });
    let data = await result.toArray();
    console.log(data);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};
connectDB().catch(console.error());
