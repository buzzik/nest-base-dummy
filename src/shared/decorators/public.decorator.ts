import { SetMetadata } from '@nestjs/common';
// TODO: move all constants to separate file
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
