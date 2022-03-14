import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: PlaceId;

  @Column()
  name: string;
}
