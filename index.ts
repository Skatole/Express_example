const express = require("express");
const app = express();
const morgan = require('morgan');

// app.get('/', (req, res) => {
//   res.sendStatus(200);
// });

// app.post('/', (req, res) => {
//   res.status(201).send('TADAAAM');
// });

const loggerMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

const authetnticationMiddleware = (req, res, next) => {
  console.log("Authentication");
  res.locals.user = { username: "Woody" };
  next();
};

const getRootHandlerer = (req, res) => {
  console.log(req.path, req.method, req.query);
  res.sendStatus(200);
};

const getUserHandler = (req, res) => {
  console.log("params:", req.params);
  // res.sendStatus(200);
  res
    .status(400)
    .send(`Dear ${res.locals.user.username} ! It was a bad request`);
};

const redirectExampHandler = (req, res) => {
  res.redirect("/;");
};

// const createIssue = (req, res) => {
//   console.log(req.body);
//   res.sendStatus(201);
// };

const getIssue = (req, res) => {
  const issue = {
    title: 'Test',
    description: 'test disc'
  };
  res.json(issue);
};

app.use(morgan('tiny'));
app.use(express.json);
app.use(loggerMiddleware);
app.use(authetnticationMiddleware);
app.get("/", getRootHandlerer);
app.get("/user/:userId", getUserHandler);
app.get("/redirect-example", redirectExampHandler);
app.post('/issue', createIssue);
app.get('/issue/:id', getIssue);
app.listen(3000);
