import {Module} from '@nestjs/common'
import {AuthModule} from '../auth/auth.module'
import {DatabaseModule} from '../database/database.module'
import {SessionsService} from './sessions.service'
import {SessionsResolver} from './sessions.resolver'
import {UsersModule} from '../users/users.module'

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  providers: [SessionsService, SessionsResolver],
})
export class SessionsModule {}
