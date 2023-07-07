import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { LogService } from './log.service';
import { AuthGuard } from '../auth/auth.guard';
import { MakeLogDto } from './dto/makelog.dto';

@Controller('log')
export class LogController {
    constructor(private logService: LogService) { }

    @UseGuards(AuthGuard)
    @Post('makelog')
    makeLog(@Request() req) {
        const makeLogDto: MakeLogDto = req.body;
        makeLogDto.userId = req.user.sub;
        return this.logService.makeLog(makeLogDto)
    }
}
