import {NotFoundException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {AuthService} from '../auth/auth.service'
import {Session} from './session.entity'
import {SessionsService} from './sessions.service'

@Resolver(of => Session)
export class SessionsResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Mutation(returns => Session)
  async logIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.sessionsService.logIn({
      email: email,
      password: password,
    })
    if (!user) {
      throw new NotFoundException(email)
    }
    const jwt = this.authService.createToken(email)
    return {
      jwt,
      user,
    }
  }
}
