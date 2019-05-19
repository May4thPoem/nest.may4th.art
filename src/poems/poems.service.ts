import {Inject, Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {POEMS_REPOSITORY} from '../common/constants'
import {Poem} from './poem.entity'
import {User} from '../users/user.entity'

@Injectable()
export class PoemsService {
  constructor(
    @Inject(POEMS_REPOSITORY)
    private readonly poemsRepository: Repository<Poem>,
  ) {}

  async createPoem({
    author,
    title,
    content,
    isPublic,
  }: {
    author: User
    title: string
    content: string
    isPublic: boolean
  }): Promise<Poem> {
    const newPoem = this.poemsRepository.create({
      author: author,
      title: title,
      content: content,
      isPublic: isPublic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    await this.poemsRepository.insert(newPoem)
    return newPoem
  }

  async updatePoem({
    id,
    author,
    title,
    content,
    isPublic,
  }: {
    id: string
    author: User
    title: string
    content: string
    isPublic?: boolean
  }): Promise<Poem> {
    let poem = await this.poemsRepository.findOne(id)
    poem = {
      ...poem,
      author,
      title,
      content,
      isPublic,
      updatedAt: new Date(),
    }
    await this.poemsRepository.update(id, poem)
    return poem
  }

  async deletePoem(id: string) {
    return await this.poemsRepository.delete(id)
  }

  async findAllPublicPoems(skip: number, take: number): Promise<Poem[]> {
    return await this.poemsRepository.find({
      where: {
        isPublic: true,
      },
      order: {
        updatedAt: 'DESC',
      },
      skip,
      take,
    })
  }

  async findPoemsByUser(
    user: User,
    skip: number,
    take: number,
  ): Promise<Poem[]> {
    return await this.poemsRepository.find({
      where: {
        author: user,
      },
      order: {
        updatedAt: 'DESC',
      },
      skip,
      take,
    })
  }

  async findPoemById(id: string): Promise<Poem> {
    return await this.poemsRepository.findOne(id)
  }
}
