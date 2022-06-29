const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const connectDB = async function () {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Create Collections inside school database
    let dbName = "school",
      // collectionNames = ["students", "courses", "employees", "seats"];
    collectionName = "students";

    // Creating a Single Collection
    await createCollection(client, dbName, collectionName).then(
      console.log(
        `Collection ${collectionName} created successfully into ${dbName}`
      )
    );

    // Creating Multiple Collections
    // for (collection in collectionNames) {
    //   await createCollection(client, dbName, collectionNames[collection]).then(
    //     console.log(
    //       `Collection ${collectionNames[collection]} created successfully into ${dbName}`
    //     )
    //   );
    // }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};
const createCollection = async function (client, dbName, collectionName) {
  try {
    await client.db(dbName).createCollection(collectionName);
  } catch (e) {
    console.error(e);
  }
};
connectDB().catch(console.error);
