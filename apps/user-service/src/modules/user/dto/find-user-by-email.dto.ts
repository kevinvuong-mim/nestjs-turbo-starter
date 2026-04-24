import { Gender, Role } from '@app/common';
import { IsEmail } from 'class-validator';

export class FindUserByEmailDataDto {
  @IsEmail()
  email: string;
}

export class FindUserByEmailResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  role: Role;
  password: string;
}
