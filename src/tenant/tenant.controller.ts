import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) { }

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':tenant_key')
  findOne(@Param('tenant_key') tenantKey: string) {
    return this.tenantService.findByKey(tenantKey);
  }

  @Patch()
  update(@Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.delete(id);
  }
}
