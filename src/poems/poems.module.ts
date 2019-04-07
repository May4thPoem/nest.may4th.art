import {Module} from '@nestjs/common'
import {AuthModule} from '../auth/auth.module'
import {DatabaseModule} from '../database/database.module'
import {PoemsRepository} from './poems.repository'
import {PoemsResolver} from './poems.resolver'
import {PoemsService} from './poems.service'

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [PoemsRepository, PoemsResolver, PoemsService],
})
export class PoemsModule {}
