import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FileEntity } from './file.entity';

@Entity()
export class RelationEntity {
  @PrimaryColumn({ type: 'uuid' })
  entityId: Id;

  @PrimaryColumn({ type: 'varchar' })
  fileName: FileName;

  @ManyToOne(() => FileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fileName' })
  file: FileEntity;

  @Column()
  count: number;
}
