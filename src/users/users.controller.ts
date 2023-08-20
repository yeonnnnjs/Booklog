import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Post('makefriend')
    makeFriend(@Req() req) {
        return this.usersService.makeFriend(req.user.sub, req.body.friendEmail);
    }

    @UseGuards(AuthGuard)
    @Post('confirmfriend')
    confirmFriend(@Req() req) {
        return this.usersService.confirmFriend(req.user.sub, req.body.friendInfo);
    }

    @Post('searchfriend')
    searchFriend(@Req() req) {
        return this.usersService.searchFriend(req.body.friendInfo, req.body.isEmail);
    }
}
