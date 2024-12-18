const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const list = require("./controller/list");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/list", list);

if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(process.env.CONNECTION)
        .then(() => {
            app.listen(process.env.PORT, () =>
                console.log(
                    "Connected to the DB and listening on port:",
                    process.env.PORT
                )
            );
        })
        .catch((error) => {
            console.error(error);
        });
}
module.exports = app;