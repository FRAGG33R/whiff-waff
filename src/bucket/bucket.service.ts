import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Storage } from '@google-cloud/storage'
import * as util from 'util';
import { BucketStorageService } from "./bucket.storage-service";
import { ConfigService } from "@nestjs/config";
import * as env from 'src/shared/constants/constants.name-variables'
import * as  values from 'src/shared/constants/constants.values';
import * as path from 'src/shared/constants/constants.paths'
import * as  messages from 'src/shared/constants/constants.messages';

const bucketService = 'BucketService';
@Injectable()
export class BucketService extends BucketStorageService {
	private readonly storage: Storage;
	private readonly bucket: any;
	private logger = new Logger(bucketService);

	constructor(private readonly config: ConfigService) {
		super();
		this.storage = new Storage({
			keyFilename: this.config.get(env.KEY_FILENAME_PATH),
			projectId: this.config.get(env.PROJECT_ID),
		})
		this.bucket = this.storage.bucket(this.config.get(env.BUCKET_NAME));
	}

	uploadImage(file: Express.Multer.File, fileName: string): Promise<string> {
		try {
			return new Promise((resolve, reject) => {
				const { buffer } = file;
				const blob = this.bucket.file(fileName)
				const blobStream = blob.createWriteStream({
					resumable: false,
					metadata: {
						cacheControl: 'no-store',
					}
				})
				blobStream.on(values.BUCKET_TRIGRRED_EVENT, () => {
					const publicUrl: string = util.format(
						`${path.GOOGLE_CLOUD_BASE_URL}${this.bucket.name}/${blob.name}`)
					resolve(publicUrl)
				})
					.on(values.ERROR_TRIGRRED_EVENT, () => {
						reject(messages.CLOUD_FAIL_MESSAGE)
					})
					.end(buffer);
			});
		} catch (error) {
			this.logger.error(bucketService);
			throw new InternalServerErrorException();
		}
	}

	async deleteImage(file: string): Promise<any>{
		try {
			await this.bucket.file(file).delete({ ignoreNotFound: true });
		} catch (e) {
			this.logger.error(bucketService);
		}
	}
}