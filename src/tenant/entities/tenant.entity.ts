import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity({ name: 'tenants' })
export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ name: 'tenant_key', type: 'varchar', length: 100, unique: true })
    tenantKey: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ name: 'contact_email', type: 'varchar', length: 150, nullable: true })
    contactEmail?: string;

    @Index()
    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @Column({ name: 'db_connection_string', type: 'text' })
    dbConnectionString: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
    updatedAt?: Date;

    @Column({ name: 'last_connection', type: 'timestamp', nullable: true })
    lastConnection?: Date;
}