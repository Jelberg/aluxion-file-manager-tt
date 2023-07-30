import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'files_alux' })
export class FileEntity {
  @PrimaryGeneratedColumn({ name: 'files_id' })
  id: number;

  @Column({ name: 'files_key', type: 'varchar' })
  key: string;

  @Column({ name: 'files_img', type: 'varchar' })
  img: string;
}
