import {NotFoundException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {AuthService} from '../auth/auth.service'
import {Session} from '../sessions/session.entity'
import {User} from './user.entity'
import {UsersService} from './users.service'
import {CreateUserInput} from './dto/createUser.input'

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findUserById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @Mutation(returns => Session)
  async signUp(@Args('newUser') newUser: CreateUserInput): Promise<Session> {
    const user = await this.usersService.createUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })
    const jwt = await this.authService.createToken(newUser.email)
    return {
      jwt,
      user,
    }
  }
}
