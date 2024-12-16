const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const list = require("./controller/list");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const CONNECTION = process.env.CONNECTION;
const PORT = process.env.PORT || 3000;

app.use("/list", list);

// Create a standalone function to start the server
const startServer = async () => {
    try {
        await mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure code
    }
};

// Export `app` for testing purposes
const createServer = () => app;

if (require.main === module) {
    // If the file is run directly (not imported for testing), start the server
    startServer();
}

module.exports = { createServer, startServer };