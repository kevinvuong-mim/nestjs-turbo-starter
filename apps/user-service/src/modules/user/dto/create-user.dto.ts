import { Gender, Role } from '@app/common';

export class CreateUserDataDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  phoneNumber?: string;
  avatar?: string;
  isActive?: boolean;
  role?: Role;
}

export class CreateUserResponseDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: Role;
  createdAt: Date;
}
