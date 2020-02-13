import { Field, InputType } from "type-graphql";

@InputType()
export class AddTodoInput {
  @Field()
  task: string;
}
