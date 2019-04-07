import {Connection} from 'typeorm'
import {DATABASE_CONNECTION, POEMS_REPOSITORY} from '../common/constants'
import {Poem} from './poem.entity'

export const PoemsRepository = {
  provide: POEMS_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(Poem),
  inject: [DATABASE_CONNECTION],
}
