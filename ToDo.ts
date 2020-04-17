//  const express = require("express"); //javascript ===> express
import express, { Request, Response} from 'express'; // Typesript ===> import
const app = express();
const port = process.env.API_PORT || 3000;

interface Todo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  authorID: number;
  author: String;
};

interface User {
  id: number;
  userName: String;
  email: String;
  role: 'admin' | 'user';
  password: String;
};

const todos: Array<Todo> = [];
let todoIndex: number = 0;

const users: Array<User> = [];
let userIndex: number = 0;

const rootHandler = (req: Request, res: Response) => {
  console.log(req.params, req.query);
  res.json({ status: "ok", id: req.params.id });
};

const todoIndexHandler = (req: Request, res: Response) => {
  // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req: Request, res: Response) => {
  //  TODO POST
  console.log(req.body);
  const todo: Todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    authorID: 2,
    author: "anonymus",
  };

  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoShowHandler = (req: Request, res: Response) => {
  for (let todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo);
    }
  }
  res.json();
};

const todoUpdateHandler = (req: Request, res: Response) => {
  for (let todo of todos) {
    if (todo.id === parseInt(req.params.id)) todo.name = req.body.name; // ha így adod meg simán akkor felül írja a nevet akkor is ha nem adsz meg nevet ( le kell ifelni hogy csak akkor irja felül ha...)
    todo.description = req.body.description;
    todo.status = req.body.status;
    return res.status(203).json(todo);
  }
  return res.status(200).json({});
};

const todoDeleteHandler = (req: Request, res: Response) => {
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    if ( todo.id === parseInt(req.params.id)) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};


const userIndexHandler = (req: Request, res: Response) => {
  res.json(users);
};

const userCreateHandler = (req: Request, res: Response) => {
  console.log(req.body);
  const user: User = {
    id: userIndex,
    userName: req.body.userName,
    email: req.body.email,
    role: 'user',
    password: req.body.password
  };
  users.push(user);
  userIndex++;
  res.status(201).json(user);
};

// checkout loadash
const userShowHandler = (req: Request, res: Response) => {
  for ( let user of users ) {
    if (user.id === parseInt(req.params.id)) {
      delete user.password;
      console.log(users);
      return res.send(user);
    }
  }
  res.json({});
};

const userUpdateHandler = (req: Request, res: Response) => {
  for ( let user of users ) {
    if (user.id === parseInt(req.params.id)) {
      user.userName = req.body.userName;
      user.email = req.body.email;
      return res.send(user);
    }
  }
  res.send({});
};

const userDeleteHandler = (req: Request, res: Response) => {
  for (let i = 0; i < users.length; i++) {
    if ( users[i].id === parseInt(req.params.id)) {
      users.slice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
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

app.post('/users', userCreateHandler);
app.get('/users/:id', userShowHandler);
app.put('/users/:id', userUpdateHandler);
app.delete('/users/:id', userDeleteHandler);

app.listen(port, () => {console.log(`I hear you peasant.(on ${port})`)})