import { FileEntity } from 'src/files/entities/file.entity';

export class UserFileEntity {
  id: number;
  name: string;
  lastname: string;
  email: string;
  files: FileEntity[];
}
