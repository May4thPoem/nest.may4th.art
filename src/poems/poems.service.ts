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
  }: {
    author: User
    title: string
    content: string
  }): Promise<Poem> {
    const newPoem = this.poemsRepository.create({
      author: author,
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    })
    await this.poemsRepository.insert(newPoem)
    return newPoem
  }

  async findAllPoems(): Promise<Poem[]> {
    return await this.poemsRepository.find()
  }

  async findPoemById(id: string): Promise<Poem> {
    return await this.poemsRepository.findOne(id)
  }
}
