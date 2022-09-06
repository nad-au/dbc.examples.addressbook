import { HasId } from './hasid.interface';
import { HasLabels } from './haslabels.interface';
import { MovieNode } from './movie.node';

export class ActorNode implements HasId, HasLabels {
  labels: string[];
  id: number;

  born: number;
  name: string;

  movies: MovieNode[];
}
