import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UsersService } from "./users.service";
import { SignUpDto, UpdateUserDto } from "src/dto";

const tagUserSwagger = 'users'
const userEndPoint = 'users'
const meEndPoint = 'me'
const profileEndPoint = 'profile/:userName'
const historyGame = 'historyGame/:userId'
const settings = 'settings'













@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {

	constructor(private userService: UsersService) { }

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Get(meEndPoint)
	async getUser(@Req() req: Request) {
		return this.userService.findUserById((req.user as any).id);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Get(profileEndPoint)
	async getUniqueUser(@Req() req: Request) {
		return this.userService.findUserByUsername(req.params.userName);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get(historyGame)
	async getHistoryGames(@Req() req: Request) {
		const idUser = req.params.userId || req.user["id"];
		const page = Number(req.query.page) || 0;
		return this.userService.getHistoryGame(idUser, page);
	}

	@UseGuards(AuthGuard('jwt'))
	@Patch(settings)
	async updateUserdata(@Body() dto: UpdateUserDto, @Req() req: Request) {


		// return this.userService.upDateUserdata((req.user as any).id, dto);
		return ('updated');
	}
	//TODO refactor success and responses and errors
}