import { Module } from '@nestjs/common'
import { Default } from '@modules/default/default.module'

@Module({
  imports: [Default],
  controllers: []
})
export class AppModule {}
