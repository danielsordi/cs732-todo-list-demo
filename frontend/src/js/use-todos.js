import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import axios from "axios";
import { v4 as uuid } from "uuid";

const todosSignal = signal([]);

/**
 * Fetches the todos from the database; stores them in the signal on sucess.
 */
function retrieveTodos() {
    axios.get("http://localhost:3000/api/todos").then((response) => (todosSignal.value = response.data));
}

retrieveTodos();

/**
 * Toggle the isComplete status of the given todo
 * @param todo the todo to update
 */
function updateTodo(todo) {
    //Optimistic update
    const oldTodos = todosSignal.value;
    todosSignal.value = todosSignal.value.map(oldTodo => {
        if (oldTodo !== todo) return oldTodo;
        return { ...todo, isComplete: !todo.isComplete }
    })

    // Make API request; rollback if request fails
    axios
        .patch(`http://localhost:3000/api/todos/${todo._id}`, { isComplete: !todo.isComplete })
        .catch(err => {
            console.log(err);
            todosSignal.value = oldTodos;
        })
}

/**
 * Deletes the given todo
 * 
 * @param todo the todo to delete 
 */
function deleteTodo(todo) {
    const oldTodos = todosSignal.value;
    todosSignal.value = todosSignal.value.filter(oldTodo => oldTodo !== todo);

    // Make API request; rollback is API request fails
    axios.delete(`http://localhost:3000/api/todos/${todo._id}`).catch(err => {
        console.log(err);
        todosSignal.value = oldTodos;
    })
}

/**
 * Creates a new todo with the given description and due date
 * 
 * @param description the new todo's description
 * @param dueDate the new todo's due date 
 */
function createTodo(description, dueDate) {
    // Optimistic create
    const oldTodos = todosSignal.value;
    const newTodo = {
        _id: uuid(),
        description,
        dueDate,
        isComplete: false
    };
    todosSignal.value = [...todosSignal.value, newTodo];

    // Make API request; rollback is API request fails 
    axios
        .post(`http://localhost:3000/api/todos`, { description, dueDate })
        .then((response) => {
            todosSignal.value = [...oldTodos, response.data];
            console.log(response);
        })
        .catch(err => {
            console.log(err);
            todosSignal.value = oldTodos;
        });
}

export function useTodos() {
    useSignals();

    return { todos: todosSignal.value, retrieveTodos, updateTodo, deleteTodo, createTodo };
}