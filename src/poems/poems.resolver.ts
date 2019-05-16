import {NotFoundException, UnauthorizedException, UseGuards} from '@nestjs/common'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {GqlAuthGuard} from '../auth/guards/gql.auth'
import {CreatePoemInput} from './dto/createPoem.input'
import {Poem} from './poem.entity'
import {PoemsService} from './poems.service'

@Resolver('Poems')
export class PoemsResolver {
  constructor(
    private readonly poemsService: PoemsService,
  ) {}

  @Query(returns => Poem)
  async poem(@Args('id') id: number): Promise<Poem> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) {
      throw new NotFoundException(id)
    }
    return poem
  }

  @Query(returns => [Poem])
  async allPublicPoems(): Promise<Poem[]> {
    const poems = await this.poemsService.findAllPublicPoems()
    if (!poems) {
      throw new NotFoundException()
    }
    return poems
  }

  @Query(returns => [Poem])
  @UseGuards(GqlAuthGuard)
  async myPoems(@Context() context): Promise<Poem[]> {
    return await this.poemsService.findPoemsByUser(context.req.user)
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
      isPublic: newPoem.isPublic || false,
    })
    return poem
  }

  @Mutation(returns => Number)
  @UseGuards(GqlAuthGuard)
  async deletePoem(
    @Context() context,
    @Args('id') id: number,
  ): Promise<number> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) throw new NotFoundException(id)
    const author = await poem.author
    if (author.id === context.req.user.id) await this.poemsService.deletePoem(id)
    else throw new UnauthorizedException(`You cannot delete poems belonging to others!`)
    return id
  }
}
