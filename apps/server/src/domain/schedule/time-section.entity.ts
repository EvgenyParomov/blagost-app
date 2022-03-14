import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayEntity } from './day.entity';
import { EventEntity } from '../event.entity';

@Entity()
export class TimeSectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: TimeSectionId;

  @Column()
  name: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => DayEntity, { onDelete: 'CASCADE' })
  day: DayEntity;

  @ManyToMany(() => EventEntity)
  @JoinTable()
  events: EventEntity[];
}
