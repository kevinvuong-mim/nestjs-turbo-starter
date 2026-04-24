import { Gender, Role } from '@app/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDataDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  search?: string;
}

export class GetUsersResponseDto {
  users: {
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
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
}
