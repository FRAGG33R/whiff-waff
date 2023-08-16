import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BucketStorageService {
	abstract uploadImage(file: Express.Multer.File): Promise<string>;
}