import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant/entities/tenant.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import * as fs from 'fs';
import { TenantMiddleware } from './tenant/tenant.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'MASTER_DB',
      type: 'postgres',
      url: process.env.MASTER_DB_URL,
      entities: [Tenant],
      schema: 'controlapp',
      synchronize: true,
      ssl: {
        ca: fs.readFileSync('./ca.pem').toString(),
      },
    }),
    TenantModule,
    ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*');
  }
}
