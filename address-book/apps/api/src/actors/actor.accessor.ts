import { map, mapArray, Transaction } from '@dbc-tech/nest-neo4j';
import { Injectable } from '@nestjs/common';
import { MovieNode } from '../movies/nodes/movie.node';
import { GetActorOptions } from './dtos/get-actor-options';
import { ActorNode } from './nodes/actor.node';

@Injectable()
export class ActorAccessor {
  async getActors(
    tx: Transaction,
    options?: GetActorOptions,
  ): Promise<ActorNode[]> {
    const query = options?.include?.includes('movies')
      ? `
    MATCH (actor:Person)-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
        `
      : `
    MATCH (actor:Person)
    RETURN actor
         `;
    const result = await tx.run(query);

    return result.records.map((r) => {
      const actor = map(r, 'actor', ActorNode);
      if (r.has('movies')) {
        actor.movies = mapArray(r, 'movies', MovieNode);
      }

      return actor;
    });
  }

  async getActor(
    tx: Transaction,
    actorName: string,
    options?: GetActorOptions,
  ): Promise<ActorNode> {
    const query = options?.include?.includes('movies')
      ? `
    MATCH (actor:Person {name: $actorName})-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
        `
      : `
    MATCH (actor:Person {name: $actorName})
    RETURN actor
         `;
    const result = await tx.run(query, { actorName });

    if (result.records.length === 0) return null;

    const record = result.records[0];
    const actor = map(record, 'actor', ActorNode);
    if (record.has('movies')) {
      actor.movies = mapArray(record, 'movies', MovieNode);
    }
    return actor;
  }
}
