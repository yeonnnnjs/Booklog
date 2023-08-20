import { Controller, Post, Get, Request, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Post('makefriend')
    makeFriend(@Request() req) {
        return this.usersService.makeFriend(req.user.sub, req.body.friendEmail);
    }

    @UseGuards(AuthGuard)
    @Post('confirmfriend')
    confirmFriend(@Request() req) {
        return this.usersService.confirmFriend(req.user.sub, req.body.friendInfo);
    }

    @Post('searchfriend')
    searchFriend(@Request() req) {
        return this.usersService.searchFriend(req.body.friendInfo, req.body.isEmail);
    }

    @Get('profile/:userId')
    getProfile(@Param('userId') userId: number) {
        return this.usersService.getProfile(userId);
    }

}
