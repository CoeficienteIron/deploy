// @ts-nocheck
import request from "supertest";
import { app } from "../../server";
import { jest } from "@jest/globals";

import { findOneMock } from "../../__mocks__/mongodb";

jest.mock("mongodb");

describe("Weight routes", () => {
	it("should return all weight's user", async () => {
		findOneMock.mockResolvedValue({
			weight: [
				{ date: "2020-09-01T06:01:00.000Z", weight: 81.5, name: "PESO" },
			],
		});

		const response = await request(app).get("/front/weights");

		expect(response.statusCode).toEqual(200);

		expect(response.text).toEqual(
			'{"weight":[{"date":"2020-09-01T06:01:00.000Z","weight":81.5,"name":"PESO"}]}'
		);
	});
});
