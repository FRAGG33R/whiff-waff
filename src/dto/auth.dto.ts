import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import * as values from 'src/shared/constants/constants.values'


export class SignUpDto {

	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@ApiProperty()
	@IsNotEmpty()
	userName: string;

	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@ApiProperty()
	@IsNotEmpty()
	firstName: string;

	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@ApiProperty()
	@IsNotEmpty()
	lastName: string;

	@Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid email format' })
	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Matches(/^.{6,}$/, { message: 'Invalid password format' })
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

export class UpdateUserDto extends PartialType(SignUpDto) { }