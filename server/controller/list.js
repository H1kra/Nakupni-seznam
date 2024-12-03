const express = require("express");
const app = express();
const router = express.Router();

const ListSchema = require('../models/list.model');


router.route("/create").post(function (req, res) {
    const list = new ListSchema(req.body);
});

router.route("/get").get(function (req, res) {

});

router.route("/update").post(function (req, res) {

});

router.route("/delete").post(function (req, res) {

});

router.route("/list").get(function (req, res) {

});

module.exports = router;