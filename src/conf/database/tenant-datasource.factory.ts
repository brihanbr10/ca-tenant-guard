import { Client } from 'src/client/entities/client.entity';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

export function createTenantDataSource(
    connectionString: string,
) {
    return new DataSource({
        type: 'postgres',
        url: connectionString,
        entities: [Client],
        synchronize: true,
        schema: 'controlapp',
        extra: {
            ssl: {
                rejectUnauthorized: false,
                ca: fs.readFileSync('./src/ca.pem').toString(),
            },
        },
    });
}