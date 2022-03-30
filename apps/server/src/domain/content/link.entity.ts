import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LinkId;

  @Column()
  label: string;

  @Column()
  href: string;
}
