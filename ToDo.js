"use strict";
exports.__esModule = true;
//  const express = require("express"); //javascript ===> express
var express_1 = require("express"); // Typesript ===> import
var app = express_1["default"]();
var port = process.env.API_PORT || 3000;
;
;
var todos = [];
var todoIndex = 0;
var users = [];
var userIndex = 0;
var rootHandler = function (req, res) {
    console.log(req.params, req.query);
    res.json({ status: "ok", id: req.params.id });
};
var todoIndexHandler = function (req, res) {
    // /todos GET
    res.json(todos);
};
var todoCreateHandler = function (req, res) {
    //  TODO POST
    console.log(req.body);
    var todo = {
        id: todoIndex,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        authorID: 2,
        author: "anonymus"
    };
    todos.push(todo);
    todoIndex++;
    res.status(201).json(todo);
};
var todoShowHandler = function (req, res) {
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        if (todo.id === parseInt(req.params.id)) {
            return res.json(todo);
        }
    }
    res.json();
};
var todoUpdateHandler = function (req, res) {
    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {
        var todo = todos_2[_i];
        if (todo.id === parseInt(req.params.id))
            todo.name = req.body.name; // ha így adod meg simán akkor felül írja a nevet akkor is ha nem adsz meg nevet ( le kell ifelni hogy csak akkor irja felül ha...)
        todo.description = req.body.description;
        todo.status = req.body.status;
        return res.status(203).json(todo);
    }
    return res.status(200).json({});
};
var todoDeleteHandler = function (req, res) {
    for (var index = 0; index < todos.length; index++) {
        var todo = todos[index];
        if (todo.id === parseInt(req.params.id)) {
            todos.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
var userIndexHandler = function (req, res) {
    res.json(users);
};
var userCreateHandler = function (req, res) {
    console.log(req.body);
    var user = {
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
var userShowHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (user.id === parseInt(req.params.id)) {
            delete user.password;
            console.log(users);
            return res.send(user);
        }
    }
    res.json({});
};
var userUpdateHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            user.userName = req.body.userName;
            user.email = req.body.email;
            return res.send(user);
        }
    }
    res.send({});
};
var userDeleteHandler = function (req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            users.slice(i, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
app.use(express_1["default"].json());
app.get("/", rootHandler);
app.get("/todos", todoIndexHandler);
app.post("/todos", todoCreateHandler); // Create
app.get("/todos/:id", todoShowHandler); // Read
app.put("/todos/:id", todoUpdateHandler); // Update
app["delete"]('/todos/:id', todoDeleteHandler); // Delete
app.get('/users', userIndexHandler);
app.post('/users', userCreateHandler);
app.post('/users', userCreateHandler);
app.get('/users/:id', userShowHandler);
app.put('/users/:id', userUpdateHandler);
app["delete"]('/users/:id', userDeleteHandler);
app.listen(port, function () { console.log("I hear you peasant.(on " + port + ")"); });
