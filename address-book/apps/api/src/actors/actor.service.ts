import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorAccessor } from './actor.accessor';
import { GetActorOptions } from './dtos/get-actor-options';
import { ActorNode } from './nodes/actor.node';

@Injectable()
export class ActorService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly actorAccessor: ActorAccessor,
  ) {}

  async getActors(options?: GetActorOptions): Promise<ActorNode[]> {
    return this.neo4jService.transaction((tx) =>
      this.actorAccessor.getActors(tx, options),
    );
  }

  async getActor(
    actorName: string,
    options?: GetActorOptions,
  ): Promise<ActorNode> {
    return this.neo4jService.transaction(async (tx) => {
      const actor = await this.actorAccessor.getActor(tx, actorName, options);
      if (!actor) throw new NotFoundException();

      return actor;
    });
  }
}
