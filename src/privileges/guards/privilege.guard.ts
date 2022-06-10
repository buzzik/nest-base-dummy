import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRIVILEGES_KEY } from '../decorators/privilege.decorator';
import { Privilege } from '../enums/privilege.enum';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPrivileges = this.reflector.getAllAndOverride<Privilege[]>(PRIVILEGES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPrivileges) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPrivileges.some((privilege) => user.privileges?.includes(privilege));
  }
}
