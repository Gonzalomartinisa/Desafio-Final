import { Schema, model } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    timestamp: {type: Date, default: Date.now},
});

export default model('note', schema);