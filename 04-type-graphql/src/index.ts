import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import loki from "lokijs";

import { schema } from "./schema";

export const db = new loki("db.json", {
  autoload: true,
  autoloadCallback: initialize,
  autosave: true
});

function initialize() {
  const server = new ApolloServer({ schema });
  const todos = db.getCollection("todos");

  if (!todos) {
    db.addCollection("todos");
  }

  server.listen(3000, () => {
    console.log(`Server ready at http://localhost:3000`);
  });
}
