import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrivilegeEntity } from 'src/db/entities/privilege.entity';
import { Privileges } from './decorators/privilege.decorator';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Privilege } from './enums/privilege.enum';
import { PrivilegeGuard } from './guards/privilege.guard';
import { PrivilegesService } from './privileges.service';

@Controller('privileges')
@ApiTags('privileges')
export class PrivilegesController {
  constructor(private readonly privilegesService: PrivilegesService) {}

  @Post()
  @Privileges(Privilege.PRIVILEGE_CREATE)
  @UseGuards(PrivilegeGuard)
  @ApiOperation({ summary: 'Create Privilege' })
  @ApiResponse({ status: 200, type: [PrivilegeEntity] })
  async create(@Body() dto: CreatePrivilegeDto): Promise<PrivilegeEntity> {
    return this.privilegesService.create(dto);
  }
  @Put()
  @Privileges(Privilege.PRIVILEGE_UPDATE)
  @UseGuards(PrivilegeGuard)
  @ApiOperation({ summary: 'Update Privilege' })
  @ApiResponse({ status: 200, type: [PrivilegeEntity] })
  async update(@Body() dto: UpdatePrivilegeDto): Promise<PrivilegeEntity> {
    return this.privilegesService.update(dto);
  }

  @Get()
  @Privileges(Privilege.PRIVILEGE_GET)
  @UseGuards(PrivilegeGuard)
  @ApiOperation({ summary: 'Get All Privileges' })
  @ApiResponse({ status: 200, type: [PrivilegeEntity] })
  async getAll(): Promise<PrivilegeEntity[]> {
    return this.privilegesService.getAll();
  }
}
