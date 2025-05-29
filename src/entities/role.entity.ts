import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Permission, { eager: true })
    @JoinTable({
    name: 'role_permissions', // tabla intermedia explícita para relación muchos a muchos
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
    permissions: Permission[];

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}