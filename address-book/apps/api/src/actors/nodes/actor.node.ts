import { HasLabels } from '../../common/interfaces/haslabels.interface';
import { HasId } from '../../common/interfaces/hasid.interface';
import { MovieNode } from '../../movies/nodes/movie.node';

export class ActorNode implements HasId, HasLabels {
  labels: string[];
  src;
  id: number;

  born: number;
  name: string;

  movies: MovieNode[];
}
