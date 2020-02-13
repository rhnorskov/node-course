import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Todo {
  @Field(type => ID)
  id: string;

  @Field()
  task: string;

  @Field()
  completed: boolean;
}
