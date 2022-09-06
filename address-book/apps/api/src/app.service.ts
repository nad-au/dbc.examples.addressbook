import { map, mapArray, Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorNode } from './entities/actor.node';
import { MovieNode } from './entities/movie.node';

@Injectable()
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getActors(): Promise<ActorNode[]> {
    const result = await this.neo4jService.read(
      `
    MATCH (actor:Person)-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
  `,
    );
    return result.records.map((r) => {
      const actor = map(r, 'actor', ActorNode);
      actor.movies = mapArray(r, 'movies', MovieNode);

      return actor;
    });
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

  async streamActor(actorName: string) {
    this.neo4jService
      .read(
        `
    MATCH (actor:Person {name: $actorName})-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
  `,
        { actorName },
      )
      .subscribe({
        onNext: (record) => {
          const actor = map(record, 'actor', ActorNode);
          actor.movies = mapArray(record, 'movies', MovieNode);
          console.log(`Actor with Movies: ${JSON.stringify(actor)}`);
        },
      });
  }
}
