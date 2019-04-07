import {NotFoundException, UseGuards} from '@nestjs/common'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {AuthService} from '../auth/auth.service'
import {GqlAuthGuard} from '../auth/guards/gql.auth'
import {CreatePoemInput} from './dto/createPoem.input'
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
  @UseGuards(GqlAuthGuard)
  async postPoem(
    @Context() context,
    @Args('newPoem') newPoem: CreatePoemInput,
  ): Promise<Poem> {
    const poem = await this.poemsService.createPoem({
      title: newPoem.title,
      content: newPoem.content,
      author: context.req.user,
    })
    return poem
  }
}
