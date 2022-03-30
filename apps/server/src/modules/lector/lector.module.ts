import { LectorEntity } from '@blagost/server/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { LectorController } from './lector.controller';
import { LectorService } from './lector.service';

@Module({
  imports: [TypeOrmModule.forFeature([LectorEntity]), FileModule],
  controllers: [LectorController],
  providers: [LectorService],
})
export class LectorModule {}
