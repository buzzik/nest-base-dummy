import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from 'src/db/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: [RoleEntity] })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.rolesService.create(createRoleDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update Role' })
  @ApiResponse({ status: 200, type: [RoleEntity] })
  async update(@Body() updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.rolesService.update(updateRoleDto);
  }
}
