import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../../tenant/entities/tenant.entity';
import { TenantConnectionService } from './tenant-connection.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tenant], 'MASTER_DB'),
    ],
    providers: [TenantConnectionService],
    exports: [TenantConnectionService],
})
export class DatabaseModule { }
