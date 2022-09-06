import { HasId } from './hasid.interface';

export class MovieEntity implements HasId {
  id: number;
  released: number;
  tagline: string;
  title: string;
}
