const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost/27017";
const client = new MongoClient(uri);
const db = "school";
const collection = "students";
const connectDB = async function () {
  try {
    await client.connect();
    // Update Single Document
    // await updateOneCollection(
    //   client,
    //   db,
    //   collection,
    //   { name: "Sakhawat Ali" },
    //   {
    //     name: "Sakhawat Ali Larik"
    //   }
    // );

    //Update Multiple Records of Documents
    // client.db(db).collection(collection).createIndex({email:"text"});
    await updateManyCollections(
      client,
      db,
      collection,
      { age : {$gt : 20}},
      {
        age: 20,
      }
    );
  } catch (e) {
    console.error(e);
  }
};
const updateOneCollection = async function (
  client,
  dbName,
  collectionName,
  update,
  updateWith
) {
  try {
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .updateOne(update, { $set: updateWith }, { upsert: true });
    console.log(`Updated Successfully`);
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

const updateManyCollections = async function (
  client,
  dbName,
  collectionName,
  update,
  updateWith
) {
  try {
    await client
      .db(dbName)
      .collection(collectionName)
      .updateMany(update, { $set: updateWith }, { upsert: false});
    console.log("Updates Successfully");
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};

connectDB().catch(console.error());