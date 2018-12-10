import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

export const services: any[] = [
  ProductService,
  AuthService,
  MessageService,
];

export * from './product.service';
export * from './auth.service';
export * from './message.service';
