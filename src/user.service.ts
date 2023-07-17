import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async findOne(username: string): Promise<any> {
        return this.prismaService.user.findUnique({
            where: {
                nickName: username
            }
        });
    }
}