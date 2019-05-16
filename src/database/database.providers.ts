import {createConnection, ConnectionOptions} from 'typeorm'
import {DATABASE_CONNECTION} from '../common/constants'
import {Poem} from '../poems/poem.entity'
import {Session} from '../sessions/session.entity'
import {User} from '../users/user.entity'

const database = (): ConnectionOptions => {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return {
        type: 'postgres',
        host: process.env.PG_HOST,
        port: 5432,
        username: process.env.PG_USER,
        password:
          process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        entities: [Poem, Session, User],
        synchronize: true,
        ssl: true,
      }
    default:
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'gabriel',
        password: '',
        database: 'may4thnestapi',
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: true,
      }
  }
}

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection(database()),
  },
]
