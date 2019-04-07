import {forwardRef, Module} from '@nestjs/common'
import {AuthModule} from '../auth/auth.module'
import {DatabaseModule} from '../database/database.module'
import {UsersRepository} from './users.repository'
import {UsersResolver} from './users.resolver'
import {UsersService} from './users.service'

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [UsersRepository, UsersResolver, UsersService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
