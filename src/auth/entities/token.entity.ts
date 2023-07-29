import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'token_alux' })
export class TokenEntity {
  @PrimaryGeneratedColumn({ name: 'token_id' })
  id: number;

  @Column({ name: 'token_key', type: 'varchar' })
  token: string;

  @Column({ name: 'token_email', type: 'varchar' })
  email: string;

  @Column({ name: 'token_valid', type: 'boolean' })
  isValid: boolean;
}
