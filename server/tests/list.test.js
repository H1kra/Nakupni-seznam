const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Your Express app entry point
const List = require("../models/list.model");

let mongoServer;

beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connect mongoose to the in-memory server
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Close mongoose connection and stop the in-memory server
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear database before each test
    await List.deleteMany({});
});

describe("List API Endpoints", () => {
    test("POST /list/create - should create a new list", async () => {
        const listData = {
            name: "Test List",
            ownerId: new mongoose.Types.ObjectId(),
        };

        const response = await request(app).post("/list/create").send(listData);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("List created successfully");
        expect(response.body.list).toMatchObject({
            ...listData,
            ownerId: listData.ownerId.toString(), // Ensure `ownerId` is a string
        });
    });

    test("GET /list/get/:id - should retrieve a list by ID", async () => {
        const list = await List.create({
            name: "Sample List",
            ownerId: new mongoose.Types.ObjectId(),
        });

        const response = await request(app).get(`/list/get/${list._id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Sample List");
    });

    test("PUT /list/update/:id - should update a list by ID", async () => {
        const list = await List.create({
            name: "Old List Name",
            ownerId: new mongoose.Types.ObjectId(),
        });

        const updatedData = { name: "Updated List Name" };

        const response = await request(app)
            .put(`/list/update/${list._id}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.updatedList.name).toBe("Updated List Name");
    });

    test("DELETE /list/delete/:id - should delete a list by ID", async () => {
        const list = await List.create({
            name: "To Be Deleted",
            ownerId: new mongoose.Types.ObjectId(),
        });

        const response = await request(app).delete(`/list/delete/${list._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("List deleted successfully");
    });

    test("GET /list/lists - should retrieve all lists", async () => {
        const lists = [
            { name: "List 1", ownerId: new mongoose.Types.ObjectId() },
            { name: "List 2", ownerId: new mongoose.Types.ObjectId() },
        ];

        await List.insertMany(lists);

        const response = await request(app).get("/list/lists");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe("List 1");
        expect(response.body[1].name).toBe("List 2");
    });
});




