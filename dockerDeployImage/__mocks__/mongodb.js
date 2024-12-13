// __mocks__/mongodb.ts
import { jest } from "@jest/globals";

const findOneMock = jest.fn();
const toArrayMock = jest.fn();
const find = () => {
	return {
		toArray: toArrayMock,
	};
};

const MongoClient = jest.fn().mockImplementation(() => {
	return {
		// @ts-ignore
		connect: jest.fn().mockResolvedValue(true),
		db: jest.fn().mockReturnThis(),
		collection: jest.fn().mockReturnThis(),
		// @ts-ignore
		insertOne: jest.fn().mockResolvedValue({ insertedId: "mockedId" }),
		// @ts-ignore
		findOne: findOneMock,
		find: find,
		// Agrega otros métodos que uses en tus tests
	};
});

export { MongoClient, findOneMock, toArrayMock };
