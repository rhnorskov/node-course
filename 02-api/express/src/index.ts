import express from "express";
import bodyParser from "body-parser";

const todos = [
  {
    id: "1",
    task: "Do laundry"
  },
  {
    id: "2",
    task: "Walk the dog"
  }
];

const server = express();

server.use(bodyParser.json());

server.get("/todos", (req, res) => {
  res.json(todos);
});

server.get("/todos/:id", (req, res) => {
  const index = Number(req.params.id) - 1;
  res.json(todos[index]);
});

server.put("/todos/:id", (req, res) => {
  const index = Number(req.params.id) - 1;
  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

server.post("/todos", (req, res) => {
  todos.push({
    id: todos.length + 1,
    ...req.body
  });
  res.json(todos);
});

server.listen(3000, () => {
  console.log("> Listening on port 3000");
});
