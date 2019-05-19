import {Test, TestingModule} from '@nestjs/testing'
import {forwardRef} from '@nestjs/common'
import {createHash} from 'crypto'
import {AuthModule} from '../auth/auth.module'
import {UsersResolver} from './users.resolver'
import {UsersService} from './users.service'

describe('UsersResolver', () => {
  let usersResolver: UsersResolver
  let usersService: UsersService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      providers: [UsersResolver, UsersService],
    }).compile()

    usersResolver = app.get<UsersResolver>(UsersResolver)
    usersService = app.get<UsersService>(UsersService)
  })

  describe('should handle signUp when', () => {
    it('user info is complete', async () => {
      const newUser = {
        name: 'test',
        email: 'test@123.com',
        password: 'validPassw0rd',
      }
      
      jest.spyOn(usersService, 'createUser').mockImplementation(newUser => {
        const password_digest = createHash('sha1')
          .update(newUser.password)
          .digest('hex')
        return Promise.resolve({
          id: '1',
          name: newUser.name,
          email: newUser.email,
          password_digest: password_digest,
          poems: [],
        })
      })

      const signUpResponse = await usersResolver.signUp(newUser)

      expect(signUpResponse.user.password_digest).toBe('0a8035bae51f9d673c4d7bafb862d37c5317ab15')
      expect(signUpResponse.jwt.token.length).toBe(159)
    })
  })
})
