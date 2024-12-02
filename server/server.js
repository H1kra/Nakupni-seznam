const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'development') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const start = async() => {
    try {
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();
