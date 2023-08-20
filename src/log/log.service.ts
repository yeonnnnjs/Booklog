import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeLogDto } from './dto/makelog.dto';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Log } from './entities/log.entity';
import { SimpleLogDto } from './dto/simpleplog.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
        private usersService: UsersService,
    ) { }

    async makeLog(makeLogDto: MakeLogDto) {
        const result = await this.logRepository.insert(makeLogDto);
        return result.identifiers[0];
    }

    async getLogByUserId(myId: number, userId: number): Promise<SimpleLogDto[] | undefined> {
        if(await this.usersService.isFriend(myId, userId) || myId === userId) {
            const logs: Log[] = await this.logRepository.findBy({id : userId});
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
        throw new UnauthorizedException();
    }

    async getLog(id: number): Promise<Log | undefined> {
        const result = await this.logRepository.findOneBy({id});

        if(!result) {
            throw new NotFoundException;
        }

        return result;
    }

    async deleteLog(id: number) {
        const result = await this.logRepository.delete({id});

        if(result.affected === 0) {
            throw new NotFoundException;
        }
    }
}
