import { HasId } from './hasid.interface';
import { HasLabels } from './haslabels.interface';

export class MovieNode implements HasId, HasLabels {
  labels: string[];
  id: number;
  
  released: number;
  tagline: string;
  title: string;
}
