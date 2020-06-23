import {Field, ObjectType} from '@nestjs/graphql'
import {User} from '../users/user.entity'
import {JsonWebToken} from '../auth/jwt.entity'

@ObjectType()
export class Session {
  @Field()
  jwt: JsonWebToken

  @Field()
  user: User
}
