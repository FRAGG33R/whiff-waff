import { NotFoundException } from "@nestjs/common";

export class UserEceptions extends NotFoundException {
    constructor(message: string) {
        super(message);
        this.name = 'AchievementNotFoundException';
    }
}