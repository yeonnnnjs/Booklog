import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeLogDto } from './dto/makelog.dto';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Log } from './entities/log.entity';
import { SimpleLogDto } from './dto/simplelog.dto';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) { }

    async makeLog(makeLogDto: MakeLogDto): Promise<MakeLogDto | undefined> {
        this.logRepository.insert(makeLogDto);
        return makeLogDto;
    }

    async getLogByUserId(userId: string): Promise<SimpleLogDto[] | undefined> {
        const logs: Log[] = await this.logRepository.findBy({userId});
        let simpleLogs: SimpleLogDto[];

        logs.forEach((log) => {
            let simpleLog: SimpleLogDto;
            simpleLog.id = log.id;
            simpleLog.title = log.title;
            simpleLog.author = log.author;
            simpleLog.totalPage = log.totalPage;
            simpleLog.currentPage = log.currentPage;
            simpleLogs.push(simpleLog);
          });
        return simpleLogs;
    }

    async getLog(id: number): Promise<Log | undefined> {
        return this.logRepository.findOneBy({id});
    }
}
