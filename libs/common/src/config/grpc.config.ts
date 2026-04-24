import { registerAs } from '@nestjs/config';
import { join } from 'path';

const userProtoPath = join(__dirname, '../../proto/user.proto');
const notificationProtoPath = join(__dirname, '../../proto/notification.proto');

export const grpcConfiguration = registerAs('grpc', () => ({
  userService: {
    url: process.env.GRPC_USER_SERVICE_URL,
    package: 'user',
    protoPath: userProtoPath,
  },
  notificationService: {
    url: process.env.GRPC_NOTIFICATION_SERVICE_URL,
    package: 'notification',
    protoPath: notificationProtoPath,
  },
}));
