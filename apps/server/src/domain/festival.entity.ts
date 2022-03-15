import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayEntity } from './schedule/day.entity';
import { DateTime, Interval } from 'luxon';

@Entity()
export class FestivalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: FestivalId;

  @Column()
  name: string;

  @Column({
    type: 'date',
  })
  startISO: string;

  @Column({
    type: 'date',
  })
  endISO: string;

  @Column({
    default: 'UTC+3',
  })
  timezone: string;

  @OneToMany(() => DayEntity, (d) => d.festival, { onDelete: 'CASCADE' })
  days: DayEntity[];

  static startDate(fest: FestivalEntity) {
    return DateTime.fromISO(fest.startISO, {
      zone: fest.timezone,
    });
  }

  static endDate(fest: FestivalEntity) {
    return DateTime.fromISO(fest.endISO, {
      zone: fest.timezone,
    });
  }

  static interval(fest: FestivalEntity) {
    return Interval.fromDateTimes(
      FestivalEntity.startDate(fest),
      FestivalEntity.endDate(fest).plus({ day: 1 })
    );
  }
}
