import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {UsersModule} from '../users/users.module'
import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
