import { Controller, Post, Get, Request, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Post('friend/make')
    makeFriend(@Request() req) {
        return this.usersService.makeFriend(req.user.sub, req.body.friendEmail);
    }

    @UseGuards(AuthGuard)
    @Post('friend/accept')
    acceptFriend(@Request() req) {
        return this.usersService.acceptFriend(req.user.sub, req.body.friendInfo);
    }

    @Post('search')
    searchUser(@Request() req) {
        return this.usersService.searchUser(req.body.userInfo, req.body.isEmail);
    }

    @Get('profile/:userId')
    getProfile(@Param('userId') userId: number) {
        return this.usersService.getProfile(userId);
    }

    @UseGuards(AuthGuard)
    @Get('friend/list')
    getFriend(@Request() req) {
        return this.usersService.getFriendList(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post('friend/decline')
    declineFriend(@Request() req) {
        return this.usersService.declineFriend(req.user.sub, req.body.friendInfo);
    }

}
