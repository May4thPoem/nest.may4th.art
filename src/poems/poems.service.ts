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

  async findAllPublicPoems(): Promise<Poem[]> {
    return await this.poemsRepository.find({
      where: {
        isPublic: true,
      },
    })
  }

  async findPoemById(id: string): Promise<Poem> {
    return await this.poemsRepository.findOne(id)
  }
}
