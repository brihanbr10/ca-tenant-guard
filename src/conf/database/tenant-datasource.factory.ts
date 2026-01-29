import { DataSource } from 'typeorm';

export function createTenantDataSource(
    connectionString: string,
    entities: any[],
) {
    return new DataSource({
        type: 'postgres',
        url: connectionString,
        entities,
        synchronize: false,

        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    });
}