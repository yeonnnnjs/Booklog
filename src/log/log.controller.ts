import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
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
        return this.logService.makeLog(makeLogDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    viewLog(@Param('id') id: number) {
        return this.logService.getLog(id);
    }

    @UseGuards(AuthGuard)
    @Get(':userId')
    viewUserLog(@Param('userId') userId: string, @Request() req) { 
        return this.logService.getLogByUserId(req.user.sub, userId);
    }

    @UseGuards(AuthGuard)
    @Delete('deletelog')
    deleteLog(id: number) {
        return this.logService.getLog(id);
    }
}
