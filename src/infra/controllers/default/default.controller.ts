import { Controller, Inject, Get, Query } from '@nestjs/common'
import { FindByEmailUseCase } from '@modules/default/useCases/findByEmail/FindByEmailUseCase'

@Controller('default')
export class DefaultController {
  constructor(
    @Inject(FindByEmailUseCase)
    private readonly findByEmailUseCase: FindByEmailUseCase
  ) {}

  @Get('user')
  async defaultByUser(@Query('email') email: string) {
    try {
      const user = await this.findByEmailUseCase.execute(email)

      return { success: true, data: user }
    } catch (error: any) {
      return { success: false, message: (error as Error).message }
    }
  }
}
