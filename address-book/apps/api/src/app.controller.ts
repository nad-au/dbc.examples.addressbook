import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ActorEntity } from './entities/actor.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':actorName')
  async getActor(@Param('actorName') actorName: string): Promise<ActorEntity> {
    return this.appService.getActor(actorName);
  }
}
