import { Type } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import {
  KafkaOptions,
  RmqOptions,
} from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { MicroserviceName } from './microservice.enum';

export interface RmqMicroserviceOptions extends RmqOptions {
  serviceName: MicroserviceName;
}

export interface KafkaMicroserviceOptions extends KafkaOptions {
  serviceName: MicroserviceName;
}

export interface GrpcMicroserviceOptions extends GrpcOptions {
  serviceName: MicroserviceName;
}

export type MicroserviceConfigOptions =
  | RmqMicroserviceOptions
  | KafkaMicroserviceOptions
  | GrpcMicroserviceOptions;

export type SupportedTransport = Transport.KAFKA | Transport.RMQ | Transport.GRPC;

export interface MicroserviceClientDefinition {
  name: MicroserviceName;
  transport: SupportedTransport;
  options?: any;
}

export interface MicroserviceClientAsyncDefinition {
  name: MicroserviceName;
  transport: SupportedTransport;

  useFactory: (
    ...args: any[]
  ) =>
    | MicroserviceClientDefinition['options']
    | Promise<MicroserviceClientDefinition['options']>;
  inject?: (Type<any> | string | symbol)[];
}
