import { Router } from "express";
import { retrieveTodos, createTodo, updateTodo, deleteTodo } from "../../data/todos-dao.js";

const router = Router();

// On a GET request to //api/todos, returns a 200 OK response with all todos
router.get("/", async (req, res) => {
    return res.json(await retrieveTodos());
});

router.post("/", async (req, res) => {
    try {
        const { description, dueDate } = req.body;
        const todo = await createTodo(description, dueDate);
        return res.status(201).location(`/api/tods/${todo._id}`).json(todo);
    } catch (err) {
        return res.status(422).json(err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { isComplete } = req.body;
        const { id } = req.params;
        const updated = await updateTodo(id, isComplete);
        return res.sendStatus(updated ? 204 : 404);
    } catch (err) {
        return res.status(422).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await deleteTodo(id);
    return res.sendStatus(204);
});

export default router;