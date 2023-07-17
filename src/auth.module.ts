import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "./user.service";

@Module({
    imports: [UserModule, PassportModule], 
    providers: [AuthService, LocalStrategy],
})
export class AuthModule { }