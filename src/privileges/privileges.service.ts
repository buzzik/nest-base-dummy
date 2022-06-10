import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivilegeEntity } from 'src/db/entities/privilege.entity';
import { In, Repository } from 'typeorm';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Injectable()
export class PrivilegesService {
  constructor(@InjectRepository(PrivilegeEntity) private privilegesRepository: Repository<PrivilegeEntity>) {}

  async create(createPrivilegeDto: CreatePrivilegeDto): Promise<PrivilegeEntity> {
    const privilege = await this.privilegesRepository.findOneBy({ name: createPrivilegeDto.name });
    if (privilege) {
      throw new HttpException('Privilege already exists', HttpStatus.CONFLICT);
    }
    const newPermission = this.privilegesRepository.create(createPrivilegeDto);

    return this.privilegesRepository.save(newPermission);
  }

  async update(updatePrivilegeDto: UpdatePrivilegeDto): Promise<PrivilegeEntity> {
    const privilege = await this.privilegesRepository.findOneBy({ id: updatePrivilegeDto.id });
    if (!privilege) {
      throw new HttpException('Privilege not found', HttpStatus.CONFLICT);
    }
    privilege.name = updatePrivilegeDto.name;

    return this.privilegesRepository.save(privilege);
  }

  async getManyByNames(names: string[]): Promise<PrivilegeEntity[]> {
    const privileges = await this.privilegesRepository.findBy({ name: In(names) });
    if (!privileges) {
      throw new HttpException('Privileges not found', HttpStatus.NOT_FOUND);
    }
    return privileges;
  }

  async getAll(): Promise<PrivilegeEntity[]> {
    const privileges = await this.privilegesRepository.find();
    return privileges;
  }
}
