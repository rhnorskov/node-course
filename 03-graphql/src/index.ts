import express from "express";
import graphqlHTTP from "express-graphql";
import loki from "lokijs";

import { resolvers } from "./resolvers";
import { schema } from "./schema";

export const db = new loki("db.json", {
  autoload: true,
  autoloadCallback: initialize,
  autosave: true
});

function initialize() {
  const todos = db.getCollection("todos");

  if (!todos) {
    db.addCollection("todos");
  }

  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    })
  );

  app.listen(3000, () => {
    console.log("Server ready at http://localhost:3000/graphql");
  });
}
