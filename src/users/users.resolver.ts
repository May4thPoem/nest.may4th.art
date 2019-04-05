import {NotFoundException} from '@nestjs/common'
import {Args, Query, Resolver} from '@nestjs/graphql'
import {User} from './user.entity'
import {UsersService} from './users.service'

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }
}
