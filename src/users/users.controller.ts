import { BadRequestException, Body, Controller, Get, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
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

@ApiTags(tagUserSwagger)
@Controller(userEndPoint)
export class UsersController {

	constructor(private userService: UsersService, private storageService: BucketStorageService) { }

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(meEndPoint)
	async getUser(@Req() req: Request) {
		const elementsNumer = Number(req.query.elementsNumer) || 0;
		return this.userService.findUserById((req.user as any).id, elementsNumer);
	}

	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@Get(profileEndPoint)
	async getUniqueUser(@Req() req: Request) {
		return this.userService.findUserByUsername(req.params.userName);
	}

	@UseGuards(JwtGuard)
	@Get(historyGame)
	async getHistoryGames(@Req() req: Request) {
		const idUser = req.params.userId || req.user["id"];
		const page = Number(req.query.page) || 0;
		const elementsNumer = Number(req.query.elementsNumer) || 0;
		return this.userService.getHistoryGame(idUser, page, elementsNumer);
	}

	@UseGuards(JwtGuard)
	@Patch(settings)
	@UseInterceptors(FileInterceptor('avatar', {
		fileFilter: (req, file, cb) => {
		  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
			cb(null, true);
		  } else {
			cb(new BadRequestException('Invalid file type'), false);
		  }
		},
		limits: {
		  fileSize: 472 * 472,
		},
	  }))
	async updateUserdata(@Body() dto: UpdateUserDto, @Req() req: Request, @UploadedFile() avatar: Express.Multer.File) {
		if (avatar) {
			const avatarUrl = await this.storageService.uploadImage(avatar);
			dto.avatar = avatarUrl;
		}
		return this.userService.upDateUserdata((req.user as any).id, dto);
	}
	//TODO refactor success and responses and errors
}