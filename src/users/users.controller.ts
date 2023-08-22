import { BadRequestException, Body, Controller, Get, HttpStatus, Patch, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "src/dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { BucketStorageService } from "src/bucket/bucket.storage-service";
import { JwtGuard } from "src/auth/guards/guards.jwtGuard";

const tagUserSwagger = 'users'
const userEndPoint = 'users'
const meEndPoint = 'me'
const profileEndPoint = 'profile/:userName'
const historyGame = 'historyGame/:userId'
const settings = 'settings'
const friends = 'friends'

@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {

	constructor(private userService: UsersService) { }

	@ApiQuery({
		name: 'elementsNumer',
		description: 'The authorization code received from the provider',
	})
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(meEndPoint)
	async getUser(@Req() req: Request) {
		const elementsNumer = Number(req.query.elementsNumer) || 5;//TODO hardcode
		const user = await this.userService.findUserById((req.user as any).id);
		const historyGame = await this.userService.getHistoryGame((req.user as any).id, 0, elementsNumer);//TODO hardcode
		return ({ user, historyGame });
	}

	@ApiQuery({
		name: 'elementsNumer',
		description: 'The authorization code received from the provider',
	})
	@ApiParam({
		name: 'userName',
		description: 'The userName of the required user',
	})
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(profileEndPoint)
	async getUniqueUser(@Req() req: Request) {
		const elementsNumer = Number(req.query.elementsNumer) || 5;
		const user = await this.userService.findUserByUsername(req.params.userName);
		if (!user)
			throw {status: HttpStatus.NOT_FOUND, message: "user not found"};
		const historyGame = await this.userService.getHistoryGame(user.id, 0, elementsNumer);
		return ({ user, historyGame });
	}

	@ApiQuery({
		name: 'page',
		description: 'The authorization code received from the provider',
	})
	@ApiQuery({
		name: 'elementsNumer',
		description: 'The authorization code received from the provider',
	})
	@ApiParam({
		name: 'userId',
		description: 'The id of the required user',
	})
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(historyGame)
	async getHistoryGames(@Req() req: Request) {
		const idUser = req.params.userId;
		const page = Number(req.query.page) || 0;//TODO refactor
		const elementsNumer = Number(req.query.elementsNumer) || 5;//TODO refactor
		const historyGame = await this.userService.getHistoryGame(idUser, page, elementsNumer);
		return historyGame;
	}

	@ApiConsumes('multipart/form-data')
	@ApiBody({
	  description: 'User data',
	  type: UpdateUserDto,
	})
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Patch(settings)
	@UseInterceptors(FileInterceptor('avatar', {
		fileFilter: (req, file, cb) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
				cb(null, true);
			} else {
				cb(new BadRequestException('Invalid file type'), false);//TODO hard code
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
	//TODO refactor success and responses and errors
}