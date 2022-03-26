import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity, TimeSectionEntity } from '@blagost/server/domain';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, TimeSectionEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
