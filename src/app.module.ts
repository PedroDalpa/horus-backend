import { Module } from '@nestjs/common'
import { CompanyModule } from '@modules/company/company.module'

@Module({
  imports: [CompanyModule],
  controllers: []
})
export class AppModule {}
