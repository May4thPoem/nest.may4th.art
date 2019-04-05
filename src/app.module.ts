import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {typeDefs} from './common/schema'
import {DatabaseModule} from './database/database.module'
import {UsersModule} from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      typeDefs: typeDefs,
    }),
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
