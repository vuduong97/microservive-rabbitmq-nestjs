import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { Logger } from './helpers';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    morgan('[:date[iso]] :method :url :status - :response-time ms', {
      stream: { write: (message) => Logger.http(message.trim()) },
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
