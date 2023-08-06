import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

const tagUserSwagger = 'users'
const userEndPoint = 'users'
const meEndPoint = 'profile'
@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(meEndPoint)
    getUniqueUser(@Req() req: Request) {
        return (req.user);
    }
}