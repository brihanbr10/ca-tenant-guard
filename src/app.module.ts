import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant/entities/tenant.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'MASTER_DB',
      type: 'postgres',
      host: process.env.MASTER_DB_HOST || 'localhost',
      port: Number(process.env.MASTER_DB_PORT) || 5432,
      username: process.env.MASTER_DB_USER || 'postgres',
      password: process.env.MASTER_DB_PASS || 'postgres',
      database: process.env.MASTER_DB_NAME || 'tenants_config',
      schema: 'controlapp',
      entities: [Tenant],
      synchronize: false,
    }),
    TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
