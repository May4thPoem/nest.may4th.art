declare const module: any

import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
// import csurf from 'csurf'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  })
  app.use(limiter)
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
