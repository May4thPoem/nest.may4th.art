import {Module} from '@nestjs/common'
import {DatabaseModule} from '../database/database.module'
import {usersProviders} from './users.providers'
import {UsersResolver} from './users.resolver'
import {UsersService} from './users.service'

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersResolver, UsersService],
})
export class UsersModule {}
