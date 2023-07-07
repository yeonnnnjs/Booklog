import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeLogDto } from './dto/makelog.dto';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) { }

    async makeLog(makeLogDto: MakeLogDto): Promise<InsertResult | undefined> {
        return this.logRepository.insert(makeLogDto);
    }

    async getLogByUserId(userId: string): Promise<Log | undefined> {
        return this.logRepository.findOneBy({userId});
    }
}
