import { IsUUID } from 'class-validator';

export class DeleteUserDataDto {
  @IsUUID()
  id: string;
}

export class DeleteUserResponseDto {
  success: boolean;
  id: string;
  message: string;
}
