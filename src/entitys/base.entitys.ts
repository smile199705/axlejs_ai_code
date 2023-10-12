/* eslint-disable camelcase */
import { PrimaryGeneratedColumn, Column } from 'typeorm'


export class BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at!: Date

    @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date
}
