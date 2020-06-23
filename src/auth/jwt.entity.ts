import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class JsonWebToken {
  @Field()
  token: string

  @Field()
  expiresAt: number
}
