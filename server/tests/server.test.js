const request = require("supertest");
const { createServer } = require("../server"); // Assuming your server is in server.js
const mongoose = require("mongoose");
const ListSchema = require("../models/list.model"); // Assuming your List schema is in models/list.model.js

jest.mock("../models/list.model"); // Mock the ListSchema model

let server;

beforeAll(() => {
    server = createServer(); // Initialize the server
});

afterAll(() => {
    server.close(); // Shut down the server
});

describe("POST /list/create", () => {
    it("should create a new list and return a 201 status", async () => {
        // Mock the `create` method of ListSchema
        ListSchema.create.mockResolvedValue({
            _id: "mocked-id",
            name: "Groceries",
            ownerId: "user123",
            memberList: [],
            tasks: [
                { name: "Buy Milk", resolved: false },
                { name: "Buy Bread", resolved: true },
            ],
        });

        const response = await request(server).post("/list/create").send({
            name: "Groceries",
            ownerId: "user123",
            memberList: [],
            tasks: [
                { name: "Buy Milk", resolved: false },
                { name: "Buy Bread", resolved: true },
            ],
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "List created successfully");
        expect(response.body.list).toHaveProperty("_id", "mocked-id");
        expect(response.body.list).toHaveProperty("name", "Groceries");
    });

    it("should return a 500 error if create fails", async () => {
        // Mock the `create` method to reject
        ListSchema.create.mockRejectedValue(new Error("Database error"));

        const response = await request(server).post("/list/create").send({
            name: "Groceries",
            ownerId: "user123",
            memberList: [],
            tasks: [],
        });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error", "Database error");
    });
});

describe("GET /list/get/:id", () => {
    it("should retrieve a list by ID", async () => {
        // Mock the `findById` method of ListSchema
        ListSchema.findById.mockResolvedValue({
            _id: "mocked-id",
            name: "Groceries",
            ownerId: "user123",
            memberList: [],
            tasks: [{ name: "Buy Milk", resolved: false }],
        });

        const response = await request(server).get("/list/get/mocked-id");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", "mocked-id");
        expect(response.body).toHaveProperty("name", "Groceries");
    });

    it("should return a 404 error if list is not found", async () => {
        // Mock the `findById` method to return `null`
        ListSchema.findById.mockResolvedValue(null);

        const response = await request(server).get("/list/get/invalid-id");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "List not found");
    });
});

describe("DELETE /list/delete/:id", () => {
    it("should delete a list by ID", async () => {
        // Mock the `findByIdAndDelete` method of ListSchema
        ListSchema.findByIdAndDelete.mockResolvedValue({
            _id: "mocked-id",
            name: "Groceries",
        });

        const response = await request(server).delete("/list/delete/mocked-id");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "List deleted successfully");
    });

    it("should return a 404 error if list is not found", async () => {
        // Mock the `findByIdAndDelete` method to return `null`
        ListSchema.findByIdAndDelete.mockResolvedValue(null);

        const response = await request(server).delete("/list/delete/invalid-id");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "List not found");
    });
});