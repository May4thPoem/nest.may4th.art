import {IsNotEmpty, MaxLength} from 'class-validator'
import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class CreatePoemInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @Field()
  @IsNotEmpty()
  content: string

  @Field({defaultValue: false})
  isPublic?: boolean
}
