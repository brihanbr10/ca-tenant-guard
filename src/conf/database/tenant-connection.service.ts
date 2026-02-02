import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createTenantDataSource } from './tenant-datasource.factory';
import { Tenant } from '../../tenant/entities/tenant.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { TenantContext } from 'src/tenant/tenant-context';

@Injectable()
export class TenantConnectionService implements OnModuleDestroy {
    private readonly connections = new Map<string, DataSource>();

    constructor(
        @InjectDataSource('MASTER_DB')
        private readonly masterDataSource: DataSource,
    ) { }


    async getCurrentTenantDataSource(): Promise<DataSource | undefined> {
        const store = TenantContext.getStore();

        if (!store?.tenantKey) {
            throw new Error('Tenant no encontrado en contexto');
        }

        return this.getTenantDataSource(store.tenantKey);
    }


    async getTenantDataSource(tenantKey: string): Promise<DataSource | undefined> {
        if (this.connections.has(tenantKey)) {
            return this.connections.get(tenantKey);
        }

        const tenant = await this.masterDataSource
            .getRepository(Tenant)
            .findOne({
                where: { tenantKey: tenantKey, isActive: true },
            });

        if (!tenant) {
            throw new Error(`Tenant "${tenantKey}" no existe o está inactivo`);
        }

        const dataSource = createTenantDataSource(
            tenant.dbConnectionString,
        );

        await dataSource.initialize();

        this.connections.set(tenantKey, dataSource);
        return dataSource;
    }

    async onModuleDestroy() {
        for (const ds of this.connections.values()) {
            if (ds.isInitialized) {
                await ds.destroy();
            }
        }
    }
}