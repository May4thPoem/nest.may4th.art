import {Inject, Injectable} from '@nestjs/common'
import {createHash} from 'crypto'
import {Repository} from 'typeorm'
import {USERS_REPOSITORY} from '../common/constants'
import {User} from '../users/user.entity'

@Injectable()
export class SessionsService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<User>,
  ) {}

  async logIn({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<User|boolean> {
    const passwordDigest = createHash('sha1')
      .update(password)
      .digest('hex')
    const user = await this.usersRepository.findOne({
      where: {email: email},
    })
    if (user && user.password_digest === passwordDigest) return user
    else return false
  }
}
