import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { TenantConnectionService } from 'src/conf/database/tenant-connection.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(
    private readonly tenantConnectionService: TenantConnectionService,
  ) { }

  async create(createClientDto: CreateClientDto) {
    const dataSource = await this.tenantConnectionService.getCurrentTenantDataSource();

    if (!dataSource) {
      throw new Error('Tenant no encontrado en contexto');
    }

    const clientRepository = dataSource.getRepository(Client);
    const client = clientRepository.create(createClientDto);
    return clientRepository.save(client);
  }

  async findAll() {
    const dataSource = await this.tenantConnectionService.getCurrentTenantDataSource();

    if (!dataSource) {
      throw new Error('Tenant no encontrado en contexto');
    }

    const clientRepository = dataSource.getRepository(Client);
    return clientRepository.find();
  }

  async findOne(id: string) {
    const dataSource = await this.tenantConnectionService.getCurrentTenantDataSource();

    if (!dataSource) {
      throw new Error('Tenant no encontrado en contexto');
    }

    const clientRepository = dataSource.getRepository(Client);
    return clientRepository.findOneBy({ id: id });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const dataSource = await this.tenantConnectionService.getCurrentTenantDataSource();

    if (!dataSource) {
      throw new Error('Tenant no encontrado en contexto');
    }

    const clientRepository = dataSource.getRepository(Client);
    await clientRepository.update(id, updateClientDto);
    return clientRepository.findOneBy({ id: id });
  }

  async remove(id: string) {
    const dataSource = await this.tenantConnectionService.getCurrentTenantDataSource();

    if (!dataSource) {
      throw new Error('Tenant no encontrado en contexto');
    }

    const clientRepository = dataSource.getRepository(Client);
    await clientRepository.delete(id);
    return true;
  }
}
