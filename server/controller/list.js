const express = require("express");
const router = express.Router();
const ListSchema = require('../models/list.model');
const mongoose = require("mongoose")

router.route("/create").post(async function (req, res) {
    try {
        const list = new ListSchema(req.body);
        await list.save();
        res.status(201).json({ message: "List created successfully", list });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/get/:id").get(async function (req, res) {
    try {
        const { id } = req.params;
        const list = await ListSchema.findById(id);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/update/:id").put(async function (req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedList = await ListSchema.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Option to return the updated document
        );

        if (!updatedList) {
            return res.status(404).json({ message: "List not found" });
        }

        res.status(200).json({ message: "List updated successfully", updatedList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route("/delete/:id").delete(async function (req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedList = await ListSchema.findByIdAndDelete(id);
        if (!deletedList) {
            return res.status(404).json({ message: "List not found" });
        }

        res.status(200).json({ message: "List deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/lists").get(async function (req, res) {
    try {
        const lists = await ListSchema.find();
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;