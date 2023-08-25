import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import * as ErrorCode from '../shared/constants/constants.code-error';

const contestLogger = 'Bootstrap'
@Injectable()
export class PrismaService extends PrismaClient {
	private readonly logger = new Logger(contestLogger);
	constructor() { super(); }
	async connect(): Promise<void> {
		try {
			await this.$connect();
		} catch (error) {
			if (error instanceof PrismaClientInitializationError) {
				if (error.errorCode === ErrorCode.CONNECTION_DB_ERROR_CODE) {
					this.logger.error(` ${error.errorCode} : ${error.message}`);
				}
			}
		}
	}
}