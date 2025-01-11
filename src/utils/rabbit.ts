import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQModule, RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';

@Module({})
export class RabbitModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
          uri: process.env.RABBIT_URL || 'amqp://localhost:5672',
          enableControllerDiscovery: true,
          exchanges: [
            {
              name: 'exchange-chat',
              type: 'direct',
            },
          ],
        }),
      ],
      module: RabbitModule,
    };
  }
}

export const HandlerConfig: RabbitHandlerConfig = {
  type: 'subscribe',
  exchange: 'exchange-chat',
  routingKey: 'chat-route',
  queue: 'chat-queue',
};
