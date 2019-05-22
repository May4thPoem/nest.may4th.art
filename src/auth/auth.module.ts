import {forwardRef, Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {UsersModule} from '../users/users.module'
import {DEFAULT_EXPIRATION_TIME_IN_SECONDS} from '../common/constants'

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secretKey',
      signOptions: {
        expiresIn:
          parseInt(process.env.EXPIRATION_TIME, 10) ||
          DEFAULT_EXPIRATION_TIME_IN_SECONDS,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
