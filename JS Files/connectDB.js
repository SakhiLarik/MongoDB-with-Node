const { MongoClient } = require("mongodb");
const connectDB = async function () {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to mongo client .....");
    if (await client.connect()) {
      console.log("Connection Successfull");
      console.log("Databases : ");
      const dbs = await client.db().admin().listDatabases();
      dbs.databases.forEach((db) => {
        console.log(" - " + db.name);
      });
    } else {
      console.error("Error to connect to mongo client");
    }
  } catch (e) {
    console.error("Error Connecting to DB = >" + e);
  } finally {
    await client.close();
  }
};
connectDB().catch(console.error);
