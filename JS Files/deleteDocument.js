const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = "school";
const collection = "students";
const ConnecDB = async function(){
    try{
        if(await client.connect()){
            console.log("Connected Successfully");
            // Deleting one document only (Find and delete matchig first by query)
            // deleteOneDocument(client,db,collection,{age : 17});

            // Deleting Many documents all matching with queyry
            deleteManyDocument(client,db,collection,{age :{$gt: 17}});
        }
        else{
            console.error("Error connecting to database");
        }
    }
    catch(err){
        console.error(err);
    }
    // finally{
    //     client.close();
    // }
}

const deleteOneDocument = async function(client,dbName,collectionName,query){
    try{
        const deleteQ = await client.db(dbName).collection(collectionName).deleteOne(query);
        console.log(deleteQ.deletedCount);
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}

const deleteManyDocument = async function(client,dbName,collectionName,query){
    try{
        const deleteQ = await client.db(dbName).collection(collectionName).deleteMany(query);
        console.log(deleteQ);
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}
ConnecDB().catch(console.error())