import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BucketStorageService {
	abstract uploadImage(file: Express.Multer.File, fileName: string): Promise<string>;
	abstract deleteImage(url: string): Promise<any>;
}