import {Test, TestingModule} from '@nestjs/testing'
import {createHash} from 'crypto'
import {UsersModule} from './users.module'
import {UsersResolver} from './users.resolver'
import {UsersService} from './users.service'

describe('UsersResolver', () => {
  let usersResolver: UsersResolver
  let usersService: UsersService

  const newUser = {
    name: 'test',
    email: 'test@123.com',
    password: 'validPassw0rd',
  }

  const users = []
  let appRef: TestingModule

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile()
    appRef = app

    usersResolver = app.get<UsersResolver>(UsersResolver)
    usersService = app.get<UsersService>(UsersService)
  })

  afterAll(async () => {
    await appRef.close()
  })

  describe('should handle signUp when', () => {
    it('user info is complete', async () => {
      jest.spyOn(usersService, 'createUser').mockImplementation(newUser => {
        const password_digest = createHash('sha1')
          .update(newUser.password)
          .digest('hex')

        const newUserInfo = {
          id: '1',
          name: newUser.name,
          email: newUser.email,
          password_digest: password_digest,
          poems: [],
        }

        users.push(newUserInfo)

        return Promise.resolve(newUserInfo)
      })

      const signUpMutation = await usersResolver.signUp(newUser)

      expect(signUpMutation.user.password_digest).toBe(
        '0a8035bae51f9d673c4d7bafb862d37c5317ab15',
      )
      expect(signUpMutation.jwt.token.length).toBe(159)
    })
  })

  describe('should be able to get', () => {
    it('basic information of a user', async () => {
      const userId = '1'

      jest.spyOn(usersService, 'findUserById').mockImplementation(id => {
        return Promise.resolve(users.find(user => user.id === id))
      })

      const userQuery = await usersResolver.user(userId)

      expect(userQuery.email).toBe(newUser.email)
    })
  })
})
