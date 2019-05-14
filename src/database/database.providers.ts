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
        host: 'ec2-23-21-65-173.compute-1.amazonaws.com',
        port: 5432,
        username: 'djuwjoshjnjtzv',
        password:
          '84af7c9419a6b94a2e24dc24a0cb3cb9ba5ff49cf6780eba414defb3ab24768d',
        database: 'df6vg0n6o09tos',
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
