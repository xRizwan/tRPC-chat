import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

const client: MongoClient = new MongoClient(MONGODB_URI, {
  serverApi: ServerApiVersion.v1,
});
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
