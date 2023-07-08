import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { Log } from './entities/log.entity';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
