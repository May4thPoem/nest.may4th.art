import {Injectable} from '@nestjs/common'
import {User} from './user.entity'

@Injectable()
export class UsersService {
  async findOneById(id: string): Promise<User> {
    return {
      name: 'wzh',
      email: 'wzh@123.com',
    } as User
  }
}
