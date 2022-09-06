export interface HasId {
  id: number;
}

export const hasId = (arg: any): arg is HasId =>
  (arg as HasId).id !== undefined;
