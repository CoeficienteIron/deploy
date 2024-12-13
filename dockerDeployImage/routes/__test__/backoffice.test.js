// @ts-nocheck
import request from "supertest";
import { app } from "../../server";
import { afterAll, jest } from "@jest/globals";

import { findOneMock } from "../../__mocks__/mongodb";

jest.mock("mongodb");

describe("Backoffice routes", () => {
	it("should return all weight's user", async () => {
		findOneMock.mockResolvedValue({
			messages: [],
		});

		const response = await request(app).get("/messages");

		expect(response.statusCode).toEqual(200);

		expect(response.body).toEqual({ messages: [] });
	});
});
