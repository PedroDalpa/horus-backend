import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import 'module-alias/register'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  await app.listen(process.env.PORT ?? 3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
