import {NotFoundException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {User} from './user.entity'
import {UsersService} from './users.service'

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findUserById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @Mutation(returns => User)
  async signUp(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.usersService.createUser({
      name: name,
      email: email,
      password: password,
    })
  }
}
