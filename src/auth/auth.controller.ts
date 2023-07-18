import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post()
    signUp(@Body() dto: AuthDto) {
        // console.log('dto : ', dto);
        return (this.authService.singUp(dto));
    }

    @Post()
    signIn() {
        return (this.authService.singIn());
    }
}
