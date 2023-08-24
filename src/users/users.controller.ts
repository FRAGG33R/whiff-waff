import { BadRequestException, Body, Controller, Get, HttpStatus, Patch, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UsersService } from "./users.service";
import { UpdateFriendshipDto, UpdateUserDto } from "src/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtGuard } from "src/auth/guards/guards.jwtGuard";
import { Response } from 'src/shared/responses/responses.sucess-response'
import * as values from 'src/shared/constants/constants.values'
import * as  messages from 'src/shared/constants/constants.messages';

const fileName = 'avatar'
const tagUserSwagger = 'users'
const userEndPoint = 'users'
const meEndPoint = 'me'
const profileEndPoint = 'profile/:userName'
const historyGame = 'historyGame/:userId'
const settings = 'settings'
const friends = 'friends'

const numberOfGamesParam = 'elementsNumer'
const userNamePraram = 'userName'
const pageParam = 'page'
const userIDPraram = 'userId'
const dataType = 'multipart/form-data'

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
		return new Response(HttpStatus.OK, { user, historyGame, elementsNumber: historyGame.length });
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
		const historyGame = await this.userService.getHistoryGame(user.id, values.NUMBER_OF_FIRST_PAGE, elementsNumer);
		return new Response(HttpStatus.OK, { loggedUser, user, historyGame, elementsNumber: historyGame.length });
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
		const idUser = req.params.userId;
		const page = Number(req.query.page) || values.NUMBER_OF_FIRST_PAGE;
		const elementsNumer = Number(req.query.elementsNumer) || values.NUMBER_OF_GAMES;
		const historyGame = await this.userService.getHistoryGame(idUser, page, elementsNumer);
		return historyGame;
	}

	@ApiBearerAuth()
	@ApiConsumes(dataType)
	@ApiBody({
		type: UpdateUserDto,
	})
	@UseGuards(JwtGuard)
	@Patch(settings)
	@UseInterceptors(FileInterceptor(fileName, {
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException(messages.FILE_TYPE), false);
			}
		}
	}))
	async updateUserdata(@Body() dto: UpdateUserDto, @Req() req: Request, @UploadedFile() avatar: Express.Multer.File) {
		return this.userService.upDateUserdata((req.user as any).id, dto, avatar);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(friends)
	async getFriends(@Req() req: Request) {
		const friends = await this.userService.getFriends((req.user as any).id);
		return (friends)
	}

	@Patch('friendResponse')
	async updateFriendshipStatus(@Body() data: UpdateFriendshipDto): Promise<any> {
		return data
	}

}