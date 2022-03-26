import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdditionalTimeEntity } from './additional-time.entity';
import { TimeSectionEntity } from './time-section.entity';
import { FestivalEntity } from '../festival.entity';

@Entity()
export class DayEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: DayId;

  @Column()
  index: number;

  @ManyToOne(() => FestivalEntity, { onDelete: 'CASCADE', eager: true })
  festival: FestivalEntity;

  @OneToMany(() => AdditionalTimeEntity, (s) => s.day, { onDelete: 'CASCADE' })
  additionalTimes: AdditionalTimeEntity[];

  @OneToMany(() => TimeSectionEntity, (t) => t.day, { onDelete: 'CASCADE' })
  timeSections: TimeSectionEntity[];

  get date() {
    return FestivalEntity.startDate(this.festival).plus({ days: this.index });
  }
}
