import {JwtService} from '@nestjs/jwt'
import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtPayload} from './interfaces/jwt-payload.interface'
import {User} from '../users/user.entity'
import {JsonWebToken} from './jwt.entity'
import {DEFAULT_EXPIRATION_TIME_IN_MILLISECONDS} from '../common/constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(email: string): Promise<JsonWebToken> {
    const user: JwtPayload = {email: email}
    return {
      token: this.jwtService.sign(user),
      expiresAt: Date.now() + DEFAULT_EXPIRATION_TIME_IN_MILLISECONDS,
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findUserByEmail(payload.email)
  }

  async getCurrentUser(token: string): Promise<User> {
    const newToken = token.substring(7)
    const payload = this.jwtService.decode(newToken) as JwtPayload
    return await this.usersService.findUserByEmail(payload.email)
  }
}
