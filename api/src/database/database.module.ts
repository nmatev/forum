import { Module } from '@nestjs/common';
import { Database } from './abstract/database';
import { FileStorageDatabase } from './file-storage/file-storage-database';

@Module({
  providers: [{
    provide: Database,
    useClass: FileStorageDatabase,
  }],
  exports: [Database],
})

export class DatabaseModule {}
