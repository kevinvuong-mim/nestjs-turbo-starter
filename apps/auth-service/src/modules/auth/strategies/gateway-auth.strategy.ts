import {
  ERROR_RESPONSE,
  ServerException,
  TokenPayload,
  UserMessagePattern,
  UserRequestPayload,
} from '@app/common';
import {
  BaseGatewayAuthStrategy,
  MicroserviceName,
  MS_INJECTION_TOKEN,
  RedisService,
} from '@app/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Transport } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class GatewayAuthStrategy extends BaseGatewayAuthStrategy implements OnModuleInit {
  private userGrpcService!: Record<string, (data: unknown) => Observable<unknown>>;

  constructor(
    redisService: RedisService,
    @Inject(MS_INJECTION_TOKEN(MicroserviceName.UserService, Transport.GRPC))
    private readonly userClientGrpc: ClientGrpc,
  ) {
    super(redisService);
  }

  onModuleInit() {
    this.userGrpcService = this.userClientGrpc.getService('UserService');
  }

  protected async lookupAndValidateUser(
    authUser: TokenPayload,
  ): Promise<UserRequestPayload> {
    const grpcMethod =
      this.userGrpcService[UserMessagePattern.GET_USER] ?? this.userGrpcService.getUser;
    const user = (await lastValueFrom(
      grpcMethod.call(this.userGrpcService, { id: authUser.id }),
    )) as UserRequestPayload & { isActive: boolean };
    if (!user) throw new ServerException(ERROR_RESPONSE.UNAUTHORIZED);
    if (!user.isActive) throw new ServerException(ERROR_RESPONSE.USER_DEACTIVATED);

    return {
      id: user.id,
      jti: authUser.jti,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    };
  }
}
