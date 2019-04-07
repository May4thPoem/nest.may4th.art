import {forwardRef, Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {UsersModule} from '../users/users.module'
import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_KEY || 'secretKey',
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRATION_TIME, 10) || 3600,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
