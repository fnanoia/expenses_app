import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//sql
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config/const';
import { UserModule } from './user/user.module';
import { IncomesModule } from './incomes/incomes.module';
import { OutcomesModule } from './outcomes/outcomes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //dev env only
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),

    UserModule,
    IncomesModule,
    OutcomesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
