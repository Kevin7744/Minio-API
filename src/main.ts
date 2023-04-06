import { NestFactory } from '@nestjs/core';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';

async function bootstrap() {
  const app = await NestFactory.create(MinioClientModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
