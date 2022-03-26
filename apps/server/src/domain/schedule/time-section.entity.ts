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

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'varchar', default: 'many' })
  type: TimeSectionType;

  @ManyToOne(() => DayEntity, { onDelete: 'CASCADE' })
  day: DayEntity;

  @ManyToMany(() => EventEntity)
  @JoinTable()
  events: EventEntity[];
}
