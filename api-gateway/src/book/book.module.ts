import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'BOOK_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOK_SERVICE_HOST'),
            port: configService.get('BOOK_SERVICE_PORT'),
          },
        }),
    },
  ],
  controllers: [BookController]
})
export class BookModule {}
