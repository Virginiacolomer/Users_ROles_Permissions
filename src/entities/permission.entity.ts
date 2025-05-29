import { BaseEntity,JoinTable, Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable()
  roles: Role[];
}