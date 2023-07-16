import { Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUsers(): Promise<User[]> {
        try {
            const [passwordHash, passwordSalt, ...users] = await this.prismaService.user.findMany();
            return (users);

        }
        catch (error) {
            console.log("error");
            throw new Error('Failed to fetch users');
        }
    }
}