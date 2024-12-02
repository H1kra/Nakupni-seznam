const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const toDoListFolderPath = path.join(__dirname, "storage", "to-do-list");

// Method to write an toDoList to a file
function create(toDoList) {
    try {
        toDoList.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(toDoListFolderPath, `${toDoList.id}.json`);
        const fileData = JSON.stringify(toDoList);
        fs.writeFileSync(filePath, fileData, "utf8");
        return toDoList;
    } catch (error) {
        throw { code: "failedToCreateToDoList", message: error.message };
    }
}

// Method to read an toDoList from a file
function get(toDoListId) {
    try {
        const filePath = path.join(toDoListFolderPath, `${toDoListId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadToDoList", message: error.message };
    }
}

// Method to update toDoList in a file
function update(toDoList) {
    try {
        const currentToDoList = get(toDoList.id);
        if (!currentToDoList) return null;
        const newToDoList = { ...currentToDoList, ...toDoList };
        const filePath = path.join(toDoListFolderPath, `${toDoList.id}.json`);
        const fileData = JSON.stringify(newToDoList);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newToDoList;
    } catch (error) {
        throw { code: "failedToUpdateToDoList", message: error.message };
    }
}

// Method to remove an toDoList from a file
function remove(toDoListId) {
    try {
        const filePath = path.join(toDoListFolderPath, `${toDoListId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw { code: "failedToRemoveToDoList", message: error.message };
    }
}

// Method to list toDoLists in a folder
function list() {
    try {
        const files = fs.readdirSync(toDoListFolderPath);
        const toDoListList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(toDoListFolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        toDoListList.sort((a, b) => new Date(a.date) - new Date(b.date));
        return toDoListList;
    } catch (error) {
        throw { code: "failedToListToDoLists", message: error.message };
    }
}

module.exports = {
    create,
    get,
    update,
    remove,
    list,
};