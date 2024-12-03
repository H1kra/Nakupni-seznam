const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ListFolderPath = path.join(__dirname, "storage", "list");

// Method to write an toDoList to a file
function create(list) {
    try {

        return list;
    } catch (error) {
        throw { code: "failedToCreateList", message: error.message };
    }
}

module.exports = {
    create,
    get,
    update,
    remove,
    list,
};