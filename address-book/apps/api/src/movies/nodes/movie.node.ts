import { HasId } from '../../common/interfaces/hasid.interface';
import { HasLabels } from '../../common/interfaces/haslabels.interface';

export class MovieNode implements HasId, HasLabels {
  labels: string[];
  id: number;
  
  released: number;
  tagline: string;
  title: string;
}
