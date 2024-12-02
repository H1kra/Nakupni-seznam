const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/getAbl");
const ListAbl = require("../abl/list/listAbl");
const CreateAbl = require("../abl/list/createAbl");
const UpdateAbl = require("../abl/list/updateAbl");
const DeleteAbl = require("../abl/list/deleteAbl");

router.post("/create", (req, res) => {
    CreateAbl(req, res);
});

router.get("/get", (req, res) => {
    GetAbl(req, res);
});

router.post("/update", (req, res) => {
    UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
    DeleteAbl(req, res);
});

router.get("/list", (req, res) => {
    ListAbl(req, res);
});

module.exports = router;