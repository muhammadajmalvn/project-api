import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(4000);

  app.enableCors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,            //access-control-allow-credentials:true
  });
}
bootstrap();