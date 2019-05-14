import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class JsonWebToken {
  @Field()
  token: string

  @Field()
  expiresAt: number
}
