import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MongoModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        MongooseModule.forRoot(
          `mongodb://${process.env.MONGODB_HOST}/develop`,
          {
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS,
            authSource: 'admin',
            replicaSet: 'mongors',
            directConnection: true,
          },
        ),
      ],
      module: MongoModule,
    };
  }
}
