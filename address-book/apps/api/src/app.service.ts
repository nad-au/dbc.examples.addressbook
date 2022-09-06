import { map, mapArray, Neo4jService } from '@dbc-tech/nest-neo4j';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorEntity } from './entities/actor.entity';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class AppService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getActors(): Promise<ActorEntity[]> {
    const result = await this.neo4jService.read(
      `
    MATCH (actor:Person)-[:ACTED_IN]->(movie:Movie)
    RETURN actor, COLLECT(movie) AS movies
  `,
    );
    return result.records.map((r) => {
      const actor = map(r, 'actor', ActorEntity);
      actor.movies = mapArray(r, 'movies', MovieEntity);

      return actor;
    });
  }

  async getActor(actorName: string): Promise<ActorEntity> {
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
    const actor = map(record, 'actor', ActorEntity);
    actor.movies = mapArray(record, 'movies', MovieEntity);

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
          const actor = map(record, 'actor', ActorEntity);
          actor.movies = mapArray(record, 'movies', MovieEntity);
          console.log(`Actor with Movies: ${JSON.stringify(actor)}`);
        },
      });
  }
}
