import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Producer APIs')
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup('api/:version/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Lưu lại token khi refresh trang
      defaultModelsExpandDepth: -1, // Ẩn thông tin các model khi khai báo Swagger
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
