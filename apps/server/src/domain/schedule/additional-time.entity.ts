import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayEntity } from './day.entity';
import { EventEntity } from '../event.entity';

@Entity()
export class AdditionalTimeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AdditionalTimeId;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @ManyToOne(() => DayEntity, { onDelete: 'CASCADE' })
  day: DayEntity;

  @ManyToOne(() => EventEntity)
  event: EventEntity;
}
