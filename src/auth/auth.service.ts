import {JwtService} from '@nestjs/jwt'
import {Injectable} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtPayload} from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(email: string): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = {email: email}
    return this.jwtService.sign(user)
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findUserByEmail(payload.email)
  }
}
