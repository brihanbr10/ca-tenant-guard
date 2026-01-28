import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant, 'MASTER_DB')
    private repo: Repository<Tenant>,
  ) { }

  async findByKey(tenantKey: string): Promise<Tenant | null> {
    return await this.repo.findOneBy({
      tenantKey,
      isActive: true,
    });
  }

  async updateLastConnection(id: string) {
    await this.repo.update(id, {
      lastConnection: new Date(),
    });
  }
}