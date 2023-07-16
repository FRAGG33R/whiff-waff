import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        try {
            return this.usersService.getUsers();
        } catch (error) {
            // Handle the error here
            console.error('An error occurred while getting users:', error);
            // Return an appropriate error response
            throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}