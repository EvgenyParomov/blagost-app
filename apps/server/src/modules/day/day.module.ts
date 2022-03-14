import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayEntity } from '@blagost/server/domain';
import { DayService } from './day.service';
import { DayController } from './day.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DayEntity])],
  providers: [DayService],
  controllers: [DayController],
})
export class DayModule {}
