import { DtoConstructor, plainToDto } from './plain-to-dto';
import {
  Node,
  Relationship,
  Record,
  isNode,
  isRelationship,
} from 'neo4j-driver-core';

export function map<T>(
  record: Record,
  key: string,
  dtoConstructor?: DtoConstructor<T>,
) {
  const entry = record.get(key);
  if (isNode(entry)) {
    const node = entry as Node;
    return plainToDto<T>(node.properties, dtoConstructor);
  } else if (isRelationship(entry)) {
    const rel = entry as Relationship;
    return plainToDto<T>(rel.properties, dtoConstructor);
  }

  return plainToDto<T>(entry, dtoConstructor);
}

export function mapArray<T>(
  record: Record,
  key: string,
  dtoConstructor?: DtoConstructor<T[]>,
) {
  const entry = record.get(key) as object[];
  if (isNode(entry[0])) {
    const nodes = entry as Node[];
    return plainToDto<T[]>(
      nodes.map((n) => n.properties),
      dtoConstructor,
    );
  } else if (isRelationship(entry[0])) {
    const nodes = entry as Relationship[];
    return plainToDto<T[]>(
      nodes.map((n) => n.properties),
      dtoConstructor,
    );
  }

  return plainToDto<T[]>(entry, dtoConstructor);
}
