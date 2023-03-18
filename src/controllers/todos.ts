import { RequestHandler } from "express";
import { Todo } from "../models/Todos";
import { v4 as uuidv4 } from "uuid";
import { nextTick } from "process";
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(uuidv4(), text);
  TODOS.unshift(newTodo);
  res.status(201).json({ message: "Created new Todo", createNewTodo: newTodo });
};
export const getTodos: RequestHandler = (req, res, next) => {
  res.status(201).json({ todos: TODOS });
};
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex < -1) {
    throw new Error("Could not find todo");
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.status(201).json({ message: "Updated todo", todo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex < -1) {
    throw new Error("Could not find todo");
  }
  TODOS.splice(todoIndex, 1);
  res.status(201).json({ message: "Todo deleted" });
};
