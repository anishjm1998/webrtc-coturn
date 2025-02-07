import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express'; // Import the Response type from Express

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'public' folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Custom route to serve index.html
  app.getHttpAdapter().get('/', (req, res: Response) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html')); // Cast res to Express Response
  });

  await app.listen(3000);
}
bootstrap();
