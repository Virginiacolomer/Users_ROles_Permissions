import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, JoinColumn, Index, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
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

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
