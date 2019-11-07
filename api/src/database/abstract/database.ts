import { Entity } from './entity.contract';

export abstract class Database<T extends Entity > {
  public abstract all(): T[];

  public abstract find(options: any): T;

  public abstract add(entity: T): T;

  public abstract update(entity: T): T;

  public abstract delete(entity: T): T;
}
