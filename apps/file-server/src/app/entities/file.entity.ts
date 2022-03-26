import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { RelationEntity } from './relation.entity';

@Entity()
export class FileEntity {
  @PrimaryColumn({ type: 'varchar' })
  name: FileName;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  create: string;

  @OneToMany(() => RelationEntity, (r) => r.file, { onDelete: 'CASCADE' })
  relations: RelationEntity[];
}
