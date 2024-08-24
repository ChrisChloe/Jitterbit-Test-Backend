import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();
console.log(process.env.DB_URI);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

export async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function createSumObject(collection, object) {
  const sumObject = {
    number1: 5,
    number2: 10,
    result: null,
    status: "pending",
  };

  await collection.insertOne(sumObject);
}

export async function findSumById(collection, id) {
  return collection.find({ id }).toArray();
}

export async function updateSumObject(collection, name, updatedFields) {
  await collection.updateMany({ name }, { $set: updatedFields });
}

export async function calcAsync(sumObject) {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("operations");
    const collection = db.collection("sum");
    
    return await createSumObject(collection, sumObject);
    // await updateStudentsByName(collection, 'John Smith', { birthdate: new Date(2001, 5, 5) });
  } catch {
    console.error("calcAsync error");
  } finally {
    await mongoClient.close();
  }
}

export async function getResults(id) {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("operations");
    const collection = db.collection("sum");

    return await findSumById(collection);
  } catch {
    console.error("getResults error");
  } finally {
    await mongoClient.close();
  }
}
