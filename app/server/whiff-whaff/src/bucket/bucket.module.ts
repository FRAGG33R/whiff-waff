import { Module, Provider } from "@nestjs/common";
import { BucketService } from "./bucket.service";
import { BucketStorageService } from "./bucket.storage-service";

@Module({
	providers: [{provide: BucketStorageService , useClass: BucketService} as Provider],
	exports: [{provide: BucketStorageService , useClass: BucketService} as Provider]
})
export class BucketModule { }