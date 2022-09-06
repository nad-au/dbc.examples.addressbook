import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ActorNode } from './entities/actor.node';

@Controller('actors')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getActors(): Promise<ActorNode[]> {
    return this.appService.getActors();
  }

  @Get(':actorName')
  async getActor(@Param('actorName') actorName: string): Promise<ActorNode> {
    return this.appService.getActor(actorName);
  }
}
