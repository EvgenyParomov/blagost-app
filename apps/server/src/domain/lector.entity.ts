import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinkEntity } from './content/link.entity';
import { EventEntity } from './event.entity';

@Entity()
export class LectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LectorId;

  @Column()
  fullName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => EventEntity)
  @JoinTable()
  events: EventEntity[];

  @Column({ type: 'varchar', nullable: true })
  avatar?: FileName;

  @Column({ type: 'varchar', nullable: true })
  video?: FileName;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  photos: FileName[];

  @ManyToMany(() => LinkEntity)
  @JoinTable()
  links: LinkEntity[];
}
