import { PrismaService } from "./prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from '@nestjs/common'

@Module({
    exports: [UserService],
    providers: [PrismaService, UserService]
})
export class UserModule { }