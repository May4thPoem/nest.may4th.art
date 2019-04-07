import {Field, ObjectType} from 'type-graphql'
import {User} from '../users/user.entity'

@ObjectType()
export class Session {
  @Field()
  token: string

  @Field()
  user: User
}
