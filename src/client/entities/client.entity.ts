import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ name: 'tenant_id', type: 'uuid' })
    tenant_id: string;

    @Column({ name: 'client_name', type: 'varchar', length: 100 })
    client_name: string;

    @Column({ name: 'client_status', type: 'varchar', length: 20, default: 'ACTIVE' })
    client_status: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
