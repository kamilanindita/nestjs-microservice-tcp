import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'CUSTOMER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CUSTOMER_SERVICE_HOST'),
            port: configService.get('CUSTOMER_SERVICE_PORT'),
          },
        }),
    },
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
