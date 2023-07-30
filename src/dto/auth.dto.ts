import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsAlpha, IsBoolean, IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength, isBoolean, isEmail } from "class-validator";
import * as values from 'src/shared/constants/constants.values'
export class SignUpDto {

    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Exclude()
    avatar: string;
    @Exclude()
    twoFactorAuth: boolean;
    @Exclude()
    status: values.PlayerStatus;
    @Exclude()
    verfiedEmail: boolean;
}
