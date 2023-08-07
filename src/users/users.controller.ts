import { Controller, Get, HttpException, HttpStatus, Req, UseGuards, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { UsersService } from "./users.service";

const tagUserSwagger = 'users'
const userEndPoint = 'users'
const profileEndPoint = 'profile'
@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {

	constructor(private userService: UsersService) { }

	@ApiBearerAuth()
	// @UseGuards(AuthGuard('jwt'))
	@Get(profileEndPoint)
	async getUniqueUser(@Req() req: Request, @Res({passthrough: true}) res: Response) {
		return await this.userService.getUserData('kfaouzi');
		// return (req.user);
	}
}