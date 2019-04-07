import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class CreatePoemInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @Field()
  @IsEmail()
  content: string
}
