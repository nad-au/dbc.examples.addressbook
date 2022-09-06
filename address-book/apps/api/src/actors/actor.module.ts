import { Module } from '@nestjs/common';
import { ActorAccessor } from './actor.accessor';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';

@Module({
  controllers: [ActorController],
  providers: [ActorService, ActorAccessor],
})
export class ActorModule {}
