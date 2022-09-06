import { map, mapArray, Neo4jService, Transaction } from '@dbc-tech/nest-neo4j';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieNode } from '../movies/nodes/movie.node';
import { ActorAccessor } from './actor.accessor';
import { GetActorOptions } from './dtos/get-actor-options';
import { ActorNode } from './nodes/actor.node';

@Injectable()
export class ActorService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly actorAccessor: ActorAccessor,
  ) {}

  async getActors(options: GetActorOptions): Promise<ActorNode[]> {
    return this.neo4jService.transaction((tx) =>
      this.actorAccessor.getActors(tx, options),
    );
  }

  async getActor(actorName: string): Promise<ActorNode> {
    const result = await this.neo4jService.read(
      `
    MATCH (actor:Person {name: $actorName})-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
  `,
      {
        actorName,
      },
    );
    if (result.records.length === 0) throw new NotFoundException();

    const record = result.records[0];
    const actor = map(record, 'actor', ActorNode);
    actor.movies = mapArray(record, 'movies', MovieNode);

    return actor;
  }
}
