import { ERROR_RESPONSE, ServerException, UserMessagePattern } from '@app/common';
import { MikroOrmMicroserviceInterceptor } from '@app/common';
import { AllExceptionFilter } from '@app/common';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserDataDto,
  CreateUserResponseDto,
  DeleteUserDataDto,
  DeleteUserResponseDto,
  FindUserByEmailDataDto,
  FindUserByEmailResponseDto,
  GetUserDataDto,
  GetUserResponseDto,
  GetUsersDataDto,
  GetUsersResponseDto,
  UpdateUserDataDto,
  UpdateUserResponseDto,
} from './dto';
import { UserService } from './user.service';

@UseInterceptors(MikroOrmMicroserviceInterceptor)
@UseFilters(AllExceptionFilter)
@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', UserMessagePattern.CREATE_USER)
  async createUser(data: CreateUserDataDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', UserMessagePattern.GET_USER)
  async getUser(data: GetUserDataDto): Promise<GetUserResponseDto> {
    return this.userService.getUser(data);
  }

  @GrpcMethod('UserService', UserMessagePattern.GET_USERS)
  async getUsers(data: GetUsersDataDto): Promise<GetUsersResponseDto> {
    return this.userService.getUsers(data);
  }

  @GrpcMethod('UserService', UserMessagePattern.UPDATE_USER)
  async updateUser(data: UpdateUserDataDto): Promise<UpdateUserResponseDto> {
    return this.userService.updateUser(data);
  }

  @GrpcMethod('UserService', UserMessagePattern.DELETE_USER)
  async deleteUser(data: DeleteUserDataDto): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUser(data);
  }

  @GrpcMethod('UserService', UserMessagePattern.FIND_USER_BY_EMAIL)
  async findUserByEmail(
    data: FindUserByEmailDataDto,
  ): Promise<FindUserByEmailResponseDto> {
    return this.userService.findUserByEmail(data);
  }
}
