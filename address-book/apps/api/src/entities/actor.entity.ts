import { HasId } from './hasid.interface';
import { MovieEntity } from './movie.entity';

export class ActorEntity implements HasId {
  id: number;
  born: number;
  name: string;

  movies: MovieEntity[];
}
