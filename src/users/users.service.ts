import {Inject, Injectable} from '@nestjs/common'
import {createHash} from 'crypto'
import {Repository} from 'typeorm'
import {USERS_REPOSITORY} from '../common/constants'
import {CreateUserInput} from './dto/createUser.input'
import {User} from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser({name, email, password}: CreateUserInput): Promise<User> {
    const passwordDigest = createHash('sha1')
      .update(password)
      .digest('hex')
    const newUser = this.usersRepository.create({
      name: name,
      email: email,
      password_digest: passwordDigest,
    })
    await this.usersRepository.insert(newUser)
    return newUser
  }

  async findUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id)
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {email: email},
    })
  }
}
