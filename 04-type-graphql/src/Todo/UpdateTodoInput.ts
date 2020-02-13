import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateTodoInput {
  @Field()
  task: string;

  @Field()
  completed: boolean;
}
