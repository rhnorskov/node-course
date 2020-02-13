import { db } from ".";
import uuid from "uuid/v4";

export const resolvers = {
  todo: ({ id }) => {
    return db.getCollection("todos").findOne({ id });
  },

  todos: () => {
    return db.getCollection("todos").find();
  },

  addTodo: ({ input }) => {
    const todo = {
      ...input,
      id: uuid(),
      completed: false
    };

    return db.getCollection("todos").insert(todo);
  },

  completeTodo: ({ id }) => {
    const todos = db.getCollection("todos");
    const todo = todos.findOne({ id });

    todo.completed = true;

    return todos.update(todo);
  }
};
