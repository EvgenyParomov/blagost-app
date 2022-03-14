import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivalEntity } from '@blagost/server/domain';
import { FestivalService } from './festival.service';
import { FestivalController } from './festival.controller';
import { FestivalCreateSubscriber } from './subscribers/festival-create.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([FestivalEntity])],
  controllers: [FestivalController],
  providers: [FestivalService, FestivalCreateSubscriber],
})
export class FestivalModule {}
