import { HttpException, HttpStatus, Injectable, Provider } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseInterface } from './types/login-response.interface';
@Injectable()
export class AuthService {
  static LocalStrategy: Provider<any>;
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    console.log(user);

    if (!user) throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    if (user.banned) throw new HttpException('User is blocked', HttpStatus.UNAUTHORIZED);
    delete user.password;
    return user;
  }

  async login(user: any): Promise<LoginResponseInterface> {
    // const payload = JSON.parse(JSON.stringify(user));
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      banned: user.banned,
      privileges: user.role.privileges.map((p) => p.name),
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
