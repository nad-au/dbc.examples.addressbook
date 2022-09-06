import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActorService } from './actor.service';
import { GetActorOptions } from './dtos/get-actor-options';
import { ActorNode } from './nodes/actor.node';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  async getActors(@Query() options?: GetActorOptions): Promise<ActorNode[]> {
    return this.actorService.getActors(options);
  }

  @Get(':actorName')
  async getActor(
    @Param('actorName') actorName: string,
    @Query() options?: GetActorOptions,
  ): Promise<ActorNode> {
    return this.actorService.getActor(actorName, options);
  }
}
