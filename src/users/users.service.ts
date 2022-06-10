import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BannedUserEntity } from 'src/db/entities/banned-user.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(BannedUserEntity) private bannedUserRepository: Repository<BannedUserEntity>,
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const newUser = this.userRepository.create(dto);
    const userRoleId = this.configService.get<string>('app.userRoleId');
    newUser.role = await this.rolesService.getRoleById(userRoleId);
    return this.userRepository.save(newUser);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const [user] = await this.userRepository.find({ where: { email }, relations: ['role', 'role.privileges'] });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async banById(banUserDto: BanUserDto): Promise<UserEntity> {
    console.log('banUserDto', banUserDto);
    const user = await this.userRepository.findOneBy({ id: banUserDto.userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.banned) {
      return user;
    }
    const bannedUser = this.bannedUserRepository.create({ user });
    console.log(bannedUser);
    await this.bannedUserRepository.save(bannedUser);
    console.log(bannedUser);

    user.banned = bannedUser;
    return user;
  }

  // async banUser() {}
}
