import {Connection} from 'typeorm'
import {DATABASE_CONNECTION, USERS_REPOSITORY} from '../common/constants'
import {User} from './user.entity'

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
]
