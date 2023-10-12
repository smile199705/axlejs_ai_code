import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../base.entitys'

@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    userName: string

    @Column()
    passWord: string

    @Column({ default: true })
    isActive: boolean
}
