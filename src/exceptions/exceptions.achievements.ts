import { NotFoundException } from "@nestjs/common";

export class AchivementEceptions extends NotFoundException {
    constructor(message: string) {
        super(message);
        this.name = 'AchievementNotFoundException';
    }
}