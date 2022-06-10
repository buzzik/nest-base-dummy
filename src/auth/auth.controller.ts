import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseInterface } from './types/login-response.interface';
import { ProfileResponseInterface } from './types/profile-response.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authentication using email and password' })
  @ApiResponse({ status: 200, type: [LoginResponseInterface] })
  async login(@Request() req): Promise<LoginResponseInterface> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Profile data' })
  @ApiResponse({ status: 200, type: [ProfileResponseInterface] })
  getProfile(@Request() req): Promise<ProfileResponseInterface> {
    return req.user;
  }
}
