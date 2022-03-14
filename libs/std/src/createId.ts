import { v4 as uuid } from 'uuid';
export function createId<T extends Brand<string, string>>() {
  return uuid() as T;
}
