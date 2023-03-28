import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
     
    @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

}
