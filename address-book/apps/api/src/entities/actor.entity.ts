import { MovieEntity } from './movie.entity';

export class ActorEntity {
  born: number;
  name: string;

  movies: MovieEntity[];
}
