import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_alux' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'user_lastname', type: 'varchar', length: 255 })
  lastname: string;

  @Column({ name: 'user_password', type: 'text' })
  password: string;

  @Column({ name: 'user_email', type: 'varchar', length: 255 })
  email: string;
}
