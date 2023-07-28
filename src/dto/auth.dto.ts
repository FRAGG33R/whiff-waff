import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsBoolean, IsEmail, IsEnum, IsNotEmpty, Matches, MaxLength, MinLength, isBoolean, isEmail } from "class-validator";

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
}
