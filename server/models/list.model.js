const mongoose = require("mongoose");
const { Schema } = mongoose;



const taskSchema = new Schema({
    name: { type: String, required: true },
    resolved: { type: Boolean, default: false },
});

const listSchema = new mongoose.Schema({
    name: { type: String, default: "Untiteled list" ,required: true },
    ownerId: { type: String, required: true },

    /*
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    */
    memberList: [
        { type: String, required: true },
        /*
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: false
            },
         */
    ],
    tasks: [taskSchema],
}, { timestamps: true });

module.exports = mongoose.model("List", listSchema);