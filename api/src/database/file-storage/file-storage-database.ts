import * as fs from 'fs';
import { join } from 'path';
import { Database } from '../abstract/database';
import { Entity } from '../abstract/entity.contract';

export class FileStorageDatabase<T extends Entity> extends Database<T> {
    // in order to work the db.json file must have at least an empty array to start with -> []
    private static DB_PATH: string = join(__dirname, './db.json');

    public all(): T[] {
        const data: any = fs.readFileSync(FileStorageDatabase.DB_PATH);

        return JSON.parse(data);
    }

    public find(options: any): T {
        return this.all().find((x: T) => Object.keys(options).every((key: string) => x[key] === options[key]));
    }

    public add(entity: T): T {
        const allData: T[] = this.all();
        allData.push(entity);

        fs.writeFileSync(FileStorageDatabase.DB_PATH, JSON.stringify(allData));

        return entity;
    }

    public update(entity: T): T {
        const allData: T[] = this.all();
        const index: number = allData.findIndex(x => x.id === entity.id);
        allData[index] = entity;

        fs.writeFileSync(FileStorageDatabase.DB_PATH, JSON.stringify(allData));

        return entity;
    }

    public delete(entity: T): T {
        const data = this.all();
        const index: number = data.findIndex(x => x.id === entity.id);
        data.splice(index, 1);

        fs.writeFileSync(FileStorageDatabase.DB_PATH, JSON.stringify(data));

        return entity;
    }
}
