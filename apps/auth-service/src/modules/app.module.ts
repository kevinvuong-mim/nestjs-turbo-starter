import {
  AllExceptionFilter,
  appCommonConfiguration,
  getWinstonConfig,
  grpcConfiguration,
  HttpLoggerMiddleware,
  kafkaConfiguration,
  rabbitmqConfiguration,
} from '@app/common';
import {
  AppAuthGuard,
  MicroserviceModule,
  MicroserviceName,
  RedisModule,
  RoleBasedAccessControlGuard,
} from '@app/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { appConfiguration } from 'src/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // validationSchema,
      validationOptions: {
        abortEarly: false,
      },
      load: [
        appCommonConfiguration,
        appConfiguration,
        rabbitmqConfiguration,
        kafkaConfiguration,
        grpcConfiguration,
      ],
    }),
    WinstonModule.forRootAsync({
      useFactory: (
        appConfig: ConfigType<typeof appConfiguration>,
        appCommonConfig: ConfigType<typeof appCommonConfiguration>,
      ) => {
        return getWinstonConfig(appConfig.appName, appCommonConfig.nodeEnv);
      },
      inject: [appConfiguration.KEY, appCommonConfiguration.KEY],
    }),
    MicroserviceModule.registerAsync([
      // {
      //   name: MicroserviceName.NotificationService,
      //   transport: Transport.RMQ,
      //   inject: [ConfigService],
      //   useFactory: (configService: ConfigService) => {
      //     const rabbitmqConfig = configService.get('rabbitmq');
      //     return {
      //       ...rabbitmqConfig,
      //       queue: MicroserviceName.NotificationService
      //     };
      //   },
      // },
      {
        name: MicroserviceName.UserService,
        transport: Transport.GRPC,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const userGrpcURLConfig = configService.get('grpc.userService');
          return {
            ...userGrpcURLConfig,
          };
        },
      },
      {
        name: MicroserviceName.NotificationService,
        transport: Transport.GRPC,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const notificationGrpcURLConfig = configService.get('grpc.notificationService');
          return {
            ...notificationGrpcURLConfig,
          };
        },
      },
    ]),
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleBasedAccessControlGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
