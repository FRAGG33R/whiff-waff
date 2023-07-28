import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import * as ErrorCode from '../shared/constants/constants.code-error';

@Injectable()
export class PrismaService extends PrismaClient {
    async connect(): Promise<void> {
        try {
            await this.$connect();
        } catch (error) {
            if (error instanceof PrismaClientInitializationError) {
                if (error.errorCode === ErrorCode.CONNECTION_DB_ERROR_CODE)
                {
                    console.log('database error when connecting prisma client');//TODO make this on logs
                }
            }
        }
    }
}