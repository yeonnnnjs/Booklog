import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './log/log.module';
import { Log } from './log/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'booklog',
      entities: [User, Log],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'testsecret',
    }),
    UsersModule,
    AuthModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}