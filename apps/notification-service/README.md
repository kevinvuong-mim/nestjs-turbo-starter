# NestV11

# Getting Started

## Server Requirements

- Node.js 22
- PostgreSQL 16

## Installing preparation

1. Default Application $BASEPATH : `/home/app.user/nestv11`

2. Copy the .env file from .env.example under $BASEPATH, fill your config in .env file instead of example config

3. Ensure these root-level gRPC variables are configured (in the monorepo root `.env`):

```bash
GRPC_USER_SERVICE_URL=0.0.0.0:3311
GRPC_NOTIFICATION_SERVICE_URL=0.0.0.0:3313
```

# I. Build the app (manual)

## 1. Dependencies Installation

```bash
  pnpm install
```

## 2. Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```
