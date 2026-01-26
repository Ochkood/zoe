import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv'; // 1. dotenv оруулж ирэх

dotenv.config(); // 2. .env файлыг албаар уншуулах

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Одоо энэ нь хоосон биш болно
    url: process.env.DATABASE_URL, 
  },
});