import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, JoinColumn, Index, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})

  @Column()
  email: string;

  @Column()
  password: string;

  get permissionCodes(): string[] {
    if (this.role && this.role.permissions) {
      return this.role.permissions.map((p) => p.name);
    }
    return [];
  }

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
