const express = require("express");
const app = express();
const todos = [{ id: 1, name: "asd" }];
const users = [{ id: 1, name: "Tasi" }];
let todoIndex = 0;
let userIndex = 0;

const rootHandler = (req, res) => {
  console.log(req.params, req.query);
  res.json({ status: "ok", id: req.params.id });
};

const todoIndexHandler = (req, res) => {
  // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req, res) => {
  //  TODO POST
  console.log(req.body);
  const todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    author: "anonymus",
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoShowHandler = (req, res) => {
  for (let todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  res.json();
};

const todoUpdateHandler = (req, res) => {
  for (let todo of todos) {
    if (todo.id === parseInt(req.params.id)) todo.name = req.body.name; // ha így adod meg simán akkor felül írja a nevet akkor is ha nem adsz meg nevet ( le kell ifelni hogy csak akkor irja felül ha...)
    todo.description = req.body.description;
    todo.status = req.body.status;
    return res.status(203).json(todo);
  }
  return res.status(200).json({});
};

const todoDeleteHandler = (req, res) => {
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    if ( todo.id === parseInt(req.params.id)) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

const userIndexHandler = (req, res) => {
  res.json(users);
};

const userCreateHandler = (req, res) => {
  console.log(req.body);
  const user = {
    id: userIndex,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  };
  users.push(user);
  userIndex++;
  res.status(201).json(user);
};



app.use(express.json());
app.get("/", rootHandler);
app.get("/todos", todoIndexHandler);
app.post("/todos", todoCreateHandler); // Create
app.get("/todos/:id", todoShowHandler); // Read
app.put("/todos/:id", todoUpdateHandler); // Update
app.delete('/todos/:id', todoDeleteHandler); // Delete
app.get('/users', userIndexHandler);
app.post('/users', userCreateHandler);