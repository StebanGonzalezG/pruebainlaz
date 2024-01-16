import { SetMetadata } from '@nestjs/common';
//Decorator clave publica jwt yefer gonzalez
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);