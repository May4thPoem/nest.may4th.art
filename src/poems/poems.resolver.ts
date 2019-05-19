import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql'
import {GqlAuthGuard} from '../auth/guards/gql.auth'
import {CreatePoemInput} from './dto/createPoem.input'
import {Poem} from './poem.entity'
import {PoemsService} from './poems.service'

@Resolver('Poems')
export class PoemsResolver {
  constructor(private readonly poemsService: PoemsService) {}

  @Query(returns => Poem)
  async poem(@Args('id') id: string): Promise<Poem> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) {
      throw new NotFoundException(id)
    }
    if (!poem.isPublic) {
      throw new UnauthorizedException('This is a private poem!')
    }
    return poem
  }

  @Query(returns => [Poem])
  async allPublicPoems(
    @Args({name: 'skip', type: () => Number, nullable: true}) skip?: number,
    @Args({name: 'take', type: () => Number, nullable: true}) take?: number,
  ): Promise<Poem[]> {
    const poems = await this.poemsService.findAllPublicPoems(skip, take)
    if (!poems) {
      throw new NotFoundException()
    }
    return poems
  }

  @Query(returns => [Poem])
  @UseGuards(GqlAuthGuard)
  async myPoems(
    @Context() context,
    @Args({name: 'skip', type: () => Number, nullable: true}) skip?: number,
    @Args({name: 'take', type: () => Number, nullable: true}) take?: number,
  ): Promise<Poem[]> {
    return await this.poemsService.findPoemsByUser(context.req.user, skip, take)
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

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async deletePoem(
    @Context() context,
    @Args('id') id: string,
  ): Promise<string> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) throw new NotFoundException(id)
    const author = await poem.author
    if (author.id === context.req.user.id)
      await this.poemsService.deletePoem(id)
    else
      throw new UnauthorizedException(
        'You cannot delete poems belonging to others!',
      )
    return id
  }

  @Mutation(returns => Poem)
  @UseGuards(GqlAuthGuard)
  async updatePoem(
    @Context() context,
    @Args('id') id: string,
    @Args('newPoem') newPoem: CreatePoemInput,
  ): Promise<Poem> {
    const poem = await this.poemsService.findPoemById(id)
    if (!poem) throw new NotFoundException(id)
    const author = await poem.author
    if (author.id === context.req.user.id)
      return await this.poemsService.updatePoem({id, author, ...newPoem})
    else
      throw new UnauthorizedException(
        'You cannot edit poems belonging to others!',
      )
  }
}
