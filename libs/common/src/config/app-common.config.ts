import { NodeEnv } from '../enums';
import { registerAs } from '@nestjs/config';

export const getAppCommonConfig = () => ({
  nodeEnv: process.env.NODE_ENV as NodeEnv || NodeEnv.Local,
  frontendUrl: process.env.FRONTEND_URL,
  timezone: process.env.TZ || "UTC",
});

export const appCommonConfiguration = registerAs('appCommon', getAppCommonConfig);
