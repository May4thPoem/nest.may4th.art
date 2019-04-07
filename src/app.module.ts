import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {typeDefs} from './common/schema'
import {DatabaseModule} from './database/database.module'
import {UsersModule} from './users/users.module'
import {SessionsModule} from './sessions/sessions.module'

const autoSchemaFile = process.env.NODE_ENV === 'prod' ? false : 'schema.gql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: autoSchemaFile,
      typeDefs: autoSchemaFile ? undefined : typeDefs,
    }),
    UsersModule,
    DatabaseModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
