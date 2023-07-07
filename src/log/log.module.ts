import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { Log } from './entities/log.entity';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
