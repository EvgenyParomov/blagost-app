import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LectorId;

  @Column()
  fullName: string;
}
