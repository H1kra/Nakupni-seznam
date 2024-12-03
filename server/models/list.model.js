const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    memberList: [
        {
            id: {type: String},
            name: {type: String},
            surname: {type: String}
        }
    ],
    tasks: [
        {
            id: {type: String, required: true},
            name: {type: String, required: true},
            resolved: {type: Boolean, default: false}

        }
        ],
}, { timestamps: true });

const List = mongoose.model("ToDoList", listSchema);
export default List;