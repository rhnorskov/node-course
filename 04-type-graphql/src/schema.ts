import { buildSchemaSync } from "type-graphql";

import { TodoResolver } from "./Todo/TodoResolver";

export const schema = buildSchemaSync({
  resolvers: [TodoResolver]
});
