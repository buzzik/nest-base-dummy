import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../db/entities/user.entity';
import { UsersService } from './users.service';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: UserEntity })
  // @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersService.createUser(dto);
    return user;
  }
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  async getAll() {
    return this.usersService.getAllUsers();
  }

  @Get('/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  async getOne(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Post('ban')
  @ApiOperation({ summary: 'Ban user by ID' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  async banById(@Body(ValidationPipe) banUserDto: BanUserDto): Promise<UserEntity> {
    return this.usersService.banById(banUserDto);
  }
}
