import { Body, Controller, Get, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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



import * as util from 'util';
import { Storage } from '@google-cloud/storage'
import * as path from 'path'
import { FileInterceptor } from "@nestjs/platform-express";
const serviceKey = path.join(__dirname, './keys.json')

const storage = new Storage({
	keyFilename: "/Users/kfaouzi/Desktop/whiff-waff/transcendance-395813-7348da296b37.json",
	projectId: 'transcendance-395813',
})

const bucket = storage.bucket('whiff-waff');

const uploadImage = (file: Express.Multer.File) => new Promise((resolve, reject) => {
	const { originalname, buffer } = file
	const blob = bucket.file(originalname.replace(/ /g, "_"))
	const blobStream = blob.createWriteStream({
	  resumable: false
	})
	blobStream.on('finish', () => {
	  const publicUrl = util.format(
		`https://storage.googleapis.com/${bucket.name}/${blob.name}`
	  )
	  resolve(publicUrl)
	})
	.on('error', () => {
	  reject(`Unable to upload image, something went wrong`)
	})
	.end(buffer)
  })








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
	@UseInterceptors(FileInterceptor('avatar'))
	async updateUserdata(@Body() dto: UpdateUserDto, @Req() req: Request, @UploadedFile() avatar: Express.Multer.File) {
		console.log('', dto);
		console.log(avatar);
		// try {
			const imageUrl = await uploadImage(avatar).catch((error) => {
				console.log(error);
			});
			// console.log(imageUrl);

		// } catch (error) {
		// 	console.log(error);
		// }
		// return this.userService.upDateUserdata((req.user as any).id, dto);
		// storage.getBuckets().then((c) => {
		// 	console.log('buuuuucket : ', c);
		// })
		return ('updated');
	}
	//TODO refactor success and responses and errors
}