import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
