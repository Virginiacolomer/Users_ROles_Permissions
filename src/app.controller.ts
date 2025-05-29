import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'status:OK';
  }
}
