import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: PlaceId;

  @Column()
  name: string;

  @Column({ nullable: true })
  howGetDescription?: string;

  @Column({ type: 'varchar', nullable: true })
  mapPhoto?: FileName;
}
