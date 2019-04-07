import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AuthModule} from './auth/auth.module'
import {typeDefs} from './common/schema'
import {DatabaseModule} from './database/database.module'
import {UsersModule} from './users/users.module'
import {SessionsModule} from './sessions/sessions.module'
import {PoemsModule} from './poems/poems.module'

const autoSchemaFile = process.env.NODE_ENV === 'prod' ? false : 'schema.gql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({req}) => ({req}),
      installSubscriptionHandlers: true,
      autoSchemaFile: autoSchemaFile,
      typeDefs: autoSchemaFile ? undefined : typeDefs,
    }),
    AuthModule,
    DatabaseModule,
    SessionsModule,
    UsersModule,
    PoemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
