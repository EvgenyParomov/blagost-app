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

  @ManyToMany(() => LectorEntity)
  @JoinTable()
  lectors: LectorEntity[];

  @ManyToMany(() => LectorEntity)
  participant: LectorEntity[];

  @ManyToOne(() => PlaceEntity)
  place: PlaceEntity;
}
