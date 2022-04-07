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
  dateTimeDescription?: string;

  @ManyToMany(() => LectorEntity, (lector) => lector.eventsHost)
  @JoinTable()
  lectors: LectorEntity[];

  @ManyToMany(() => LectorEntity, (lector) => lector.eventsParticipant)
  @JoinTable()
  participants: LectorEntity[];

  @ManyToOne(() => PlaceEntity)
  place: PlaceEntity;
}
