declare const module: any

import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
// import * as csurf from 'csurf'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )
  app.use(helmet())
  // app.use(csurf())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()

export default () => bootstrap()
