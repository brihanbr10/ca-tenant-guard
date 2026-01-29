import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

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

  async findAll(): Promise<Tenant[]> {
    return await this.repo.find({
      where: {
        isActive: true,
      },
    });
  }

  async update(updateTenantDto: UpdateTenantDto) {

    if (!updateTenantDto.tenantKey) {
      throw new Error('Tenant key is required');
    }

    const tenant = await this.findByKey(updateTenantDto.tenantKey);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    await this.repo.update(tenant.id, updateTenantDto);
    return this.repo.findOneBy({
      tenantKey: updateTenantDto.tenantKey,
      isActive: true,
    });
  }

  async updateLastConnection(id: string) {
    await this.repo.update(id, {
      lastConnection: new Date(),
    });
  }

  async create(createTenantDto: CreateTenantDto) {
    const tenant = this.repo.create(createTenantDto);
    return this.repo.save(tenant);
  }

  async delete(id: string) {
    await this.repo.delete(id);
    return true;
  }
}