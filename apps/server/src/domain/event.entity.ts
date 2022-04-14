import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectorEntity } from './lector.entity';
import { PlaceEntity } from './place.entity';

@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: EventId;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  prepareDescription?: string;

  @Column({ nullable: true })
  dateTimeDescription?: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  photos: FileName[];

  @Column({ type: 'varchar', nullable: true })
  video?: FileName;

  @ManyToMany(() => LectorEntity, (lector) => lector.eventsHost)
  @JoinTable()
  lectors: LectorEntity[];

  @ManyToMany(() => LectorEntity, (lector) => lector.eventsParticipant)
  @JoinTable()
  participants: LectorEntity[];

  @ManyToOne(() => PlaceEntity)
  place: PlaceEntity;
}
