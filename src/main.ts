import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
    const server = express();
    server.use(express.json()); // Apply express.json() middleware before NestFactory.create
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors(); // Enable CORS
    await app.listen(3000);
}

bootstrap();
