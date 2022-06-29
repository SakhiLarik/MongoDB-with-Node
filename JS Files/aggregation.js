const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const aggregateQuery = [
  {
    $match: {
      $text: {
        $search: '"Ali"',
      },
    },
  },
  {
    $group: {
      _id: "$_id",
      age: {
        $avg: "$age",
      },
    },
  },
  {
    $sort: {
      name: -1,
    },
  },
  {
    $limit: 2,
  },
];
const db = "school";
const collection = "students";
const connectDB = async function () {
  try {
    await client.connect();
    await aggregateCollection(client, db, collection, aggregateQuery);
  } catch (e) {
    console.error(e);
  }
};

const aggregateCollection = async function (
  client,
  dbName,
  collectionName,
  aggregateQuery
) {
  try {
    const aggerated = client
      .db(dbName)
      .collection(collectionName)
      .aggregate(aggregateQuery);
    await aggerated.forEach((element) => {
      console.log(`ID = ${element._id} , Age = ${element.age}`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
};
connectDB().catch(console.error());