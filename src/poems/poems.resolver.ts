import {NotFoundException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {AuthService} from '../auth/auth.service'
import {Poem} from './poem.entity'
import {PoemsService} from './poems.service'

@Resolver('Poems')
export class PoemsResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly poemsService: PoemsService,
  ) {}

  @Query(returns => Poem)
  async poem(@Args('id') id: string): Promise<Poem> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) {
      throw new NotFoundException(id)
    }
    return poem
  }

  @Mutation(returns => Poem)
  async postPoem(
    @Args('token') token: string,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Poem> {
    const poem = await this.poemsService.createPoem({
      title: title,
      content: content,
      author: await this.authService.getCurrentUser(token),
    })
    return poem
  }
}
