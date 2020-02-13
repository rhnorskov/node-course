import { Arg, Mutation, Query, Resolver } from "type-graphql";
import uuid = require("uuid");

import { db } from "..";
import { AddTodoInput } from "./AddTodoInput";
import { Todo } from "./Todo";

@Resolver(of => Todo)
export class TodoResolver {
  @Query(returns => Todo)
  async todo(@Arg("id") id: string) {
    return db.getCollection("todos").findOne({ id });
  }

  @Query(returns => [Todo])
  async todos() {
    return db.getCollection("todos").find();
  }

  @Mutation(returns => Todo)
  async addTodo(@Arg("input") input: AddTodoInput) {
    const todo: Todo = {
      ...input,
      id: uuid(),
      completed: false
    };

    return db.getCollection("todos").insert(todo);
  }

  @Mutation(returns => Todo)
  async completeTodo(@Arg("id") id: string) {
    const todos = db.getCollection("todos");
    const todo = todos.findOne({ id });

    todo.completed = true;

    return todos.update(todo);
  }
}
