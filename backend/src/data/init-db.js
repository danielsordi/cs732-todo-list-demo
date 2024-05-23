import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Todo } from "./schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connectd from Database");

let todos = [
    {
        _id: "000000000000000000000001",
        description: 'Build a rocket ship out of cardboard boxes',
        isComplete: false,
        dueDate: '2024-03-01'
    },
    {
        _id: "000000000000000000000002",
        description: 'Count all the stars in the sky',
        isComplete: false,
        dueDate: '2024-07-15'
    },
    {
        _id: "000000000000000000000003",
        description: 'Invent a new color',
        isComplete: true,
        dueDate: '2023-12-31'
    },
    {
        _id: "000000000000000000000004",
        description: 'Train a squirrel to do backflips',
        isComplete: false,
        dueDate: '2024-05-30'
    },
    {
        _id: "000000000000000000000005",
        description: 'Write a novel in emojis',
        isComplete: true,
        dueDate: '2024-01-01'
    }
];

try {
    await Todo.deleteMany({});
    await Todo.bulkSave(todos.map((t) => new Todo(t)));
} finally {
    await mongoose.disconnect();
    console.log("Disconnecting from Database");
}
