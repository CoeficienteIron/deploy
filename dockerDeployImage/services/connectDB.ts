import { MongoClient } from "mongodb";

export default async function connectDB() {
	const mongoURL = process.env.DB_URL || "";
	const client = new MongoClient(mongoURL);
	await client.connect();
	const dbName = process.env.DB_NAME;

	const database = client.db(dbName);
	const collectionName = process.env.DB_COLLECTION || "";
	const collection = database.collection(collectionName)
	return collection;
}
