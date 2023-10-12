import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { UpdateFriendshipDto, UpdateUserDto, SendFriendshipDto, UserSearchDto } from "src/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtGuard } from "src/auth/guards/guards.jwtGuard";
import { ResponseInfo } from 'src/shared/responses/responses.sucess-response'
import * as values from 'src/shared/constants/constants.values'
import * as  messages from 'src/shared/constants/constants.messages';


const tagUserSwagger = 'users'
const userEndPoint = 'users'
const meEndPoint = 'me'
const profileEndPoint = 'profile/:userName'
const historyGame = 'historyGame/:userId'

const friends = 'friends'
const friendshipResponse = 'friendshipResponse'
const search = 'search'
const sendFriendship = 'sendFriendship'
const numberOfGamesParam = 'elementsNumer'
const userNamePraram = 'userName'
const pageParam = 'page'
const userIDPraram = 'userId'


const numberOfGamesDescription = 'The amount of elements'
const userNameDescription = 'The required user\'s username'
const pageDescription = 'The number of page'
const userIDPraramDescription = 'The id of the required user'

@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {
	constructor(private userService: UsersService) { }

	@ApiBearerAuth()
	@ApiQuery({
		name: numberOfGamesParam,
		description: numberOfGamesDescription,
	})
	@UseGuards(JwtGuard)
	@Get(meEndPoint)
	async getUser(@Req() req: Request) {
		const elementsNumer = Number(req.query.elementsNumer) || values.NUMBER_OF_GAMES;
		const user = req.user;
		const historyGame = await this.userService.getHistoryGame((user as any).id, values.NUMBER_OF_FIRST_PAGE, elementsNumer);
		const loggedUser: any = { avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level, rank: (req as any).user.stat.rank };
		return new ResponseInfo(HttpStatus.OK, { user, historyGame, elementsNumber: historyGame.length, loggedUser });
	}

	@ApiBearerAuth()
	@ApiQuery({
		name: numberOfGamesParam,
		description: numberOfGamesDescription,
	})
	@ApiParam({
		name: userNamePraram,
		description: userNameDescription,
	})
	@UseGuards(JwtGuard)
	@Get(profileEndPoint)
	async getUniqueUser(@Req() req: Request) {
		const elementsNumer = Number(req.query.elementsNumer) || values.NUMBER_OF_GAMES;
		const loggedUser: any = { avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level };
		const user = await this.userService.findUserByUsername(req.params.userName, (req as any).user.id);
		const gamesData = await this.userService.getHistoryGame(user.id, values.NUMBER_OF_FIRST_PAGE, elementsNumer);
		return new ResponseInfo(HttpStatus.OK, { loggedUser, user, gamesData });
	}

	@ApiQuery({
		name: pageParam,
		description: pageDescription,
	})
	@ApiQuery({
		name: numberOfGamesParam,
		description: numberOfGamesDescription,
	})
	@ApiParam({
		name: userIDPraram,
		description: userIDPraramDescription,
	})
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(historyGame)
	async getHistoryGames(@Req() req: Request) {
		const userId = req.params.userId;
		const page = Number(req.query.page) || values.NUMBER_OF_FIRST_PAGE;
		const elementsNumer = Number(req.query.elementsNumer) || values.NUMBER_OF_GAMES;
		const historyGame = await this.userService.getHistoryGame(userId, page, elementsNumer);
		return historyGame;
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(friends)
	async getFriends(@Req() req: Request) {
		const page = Number(req.query.page) || values.NUMBER_OF_FIRST_PAGE;
		const elementsNumer = Number(req.query.elementsNumer) || values.NUMBER_OF_FRIENDS;
		const loggedUser: any = { avatar: (req as any).user.avatar, userName: (req as any).user.userName, level: (req as any).user.stat.level };
		const friends = await this.userService.getFriends((req.user as any).id, page, elementsNumer);
		return new ResponseInfo(HttpStatus.OK, { loggedUser, friends });
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(sendFriendship)
	async sendFriendshipRequest(@Body() dto: SendFriendshipDto, @Req() req: Request) {
		await this.userService.SendFriendshipRequest((req as any).user.id, dto.id);
		return new ResponseInfo(HttpStatus.OK, messages.SENDED_INVITATON)
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Patch(friendshipResponse)
	async updateFriendshipStatus(@Body() data: UpdateFriendshipDto, @Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
		const user = await this.userService.updateFriendshipStatus((req as any).user.id, data.id, data.status)
		res.send(user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Post(search)
	@HttpCode(HttpStatus.OK)
	async searchUsers(@Body() data: UserSearchDto): Promise<ResponseInfo>  {
		const users = await this.userService.searchUsersByNames(data.userName);
		return new ResponseInfo(HttpStatus.OK, users);
	}
}