import {Module} from '@nestjs/common'
import {DatabaseModule} from '../database/database.module'
import {SessionsService} from './sessions.service'
import {SessionsResolver} from './sessions.resolver'
import {usersProviders} from '../users/users.providers'

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, SessionsService, SessionsResolver],
})
export class SessionsModule {}
