import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivilegeEntity } from 'src/db/entities/privilege.entity';
import { PrivilegesService } from 'src/privileges/privileges.service';
import { Repository } from 'typeorm';
import { RoleEntity } from '../db/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    private privilegesService: PrivilegesService,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository.findOneBy({ name: createRoleDto.name });
    if (role) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }
    const newRole = this.roleRepository.create(createRoleDto);

    return this.roleRepository.save(newRole);
  }

  async update(updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    const [role] = await this.roleRepository.find({ where: { name: updateRoleDto.name }, relations: ['privileges'] });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const privileges: PrivilegeEntity[] = await this.privilegesService.getManyByNames(updateRoleDto.privileges);

    role.privileges = privileges;
    return this.roleRepository.save(role);
  }

  async getRoleById(id: string): Promise<RoleEntity> {
    const [role] = await this.roleRepository.find({ where: { id }, relations: ['privileges'] });
    return role;
  }
}
