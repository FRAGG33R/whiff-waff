import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import * as values from 'src/shared/constants/constants.values'

export class SignUpDto {

	@ApiProperty({ example: 'JohnDoe' })
	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@IsNotEmpty()
	userName: string;

	@ApiProperty({ example: 'John' })
	@ApiProperty()
	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ example: 'Doe' })
	@Matches(/^.{3,}/, { message: 'Invalid lastName format' })
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ example: 'john@gmail.com' })
	@Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid email format' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'john123doe' })
	@Matches(/^.{6,}$/, { message: 'Invalid password format' })
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
export class SignInDto {
	@ApiProperty({ example: 'john@gmail.com' })
	@Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid email format' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'john123doe' })
	@Matches(/^.{6,}$/, { message: 'Invalid password format' })
	@MinLength(6)
	@IsNotEmpty()
	password: string;
}

export class TwoAuthDto {
	@ApiProperty({ example: 's123fa3f2af12as3f12as3f1as' })
	@IsNotEmpty()
	id:	string;

	@ApiProperty({ example: '1234656' })
	@IsNotEmpty()
	pin: string
}