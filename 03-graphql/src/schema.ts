import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
  }

  input AddTodoInput {
    task: String!
  }

  type Query {
    todo(id: ID!): Todo!
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(input: AddTodoInput!): Todo!
    completeTodo(id: ID!): Todo!
  }
`);
