// // mongoTestSetup.ts
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { MongoClient } from 'mongodb';

// let mongoServer: MongoMemoryServer;
// let client: MongoClient;

// // Conexión a la base de datos en memoria antes de todos los tests
// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   client = new MongoClient(uri, {

//   });
//   await client.connect();
// });

// // Limpieza de datos después de cada test
// afterEach(async () => {
//   const db = client.db();
//   const collections = await db.collections();
//   for (const collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// // Cierre de la conexión después de todos los tests
// afterAll(async () => {
//   await client.close();
//   await mongoServer.stop();
// });

// export { client };
