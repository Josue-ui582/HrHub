import dotenv from 'dotenv';
dotenv.config();

import { PrismaConfig } from 'prisma';

const config: PrismaConfig = {
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    path: 'prisma/migrations',
  },
  schema: 'prisma/schema.prisma',
};

export default config;
