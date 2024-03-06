import {IsNotEmpty, IsString, IsEmail, MinLength, MaxLength} from 'class-validator'

export class LoginUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;  //usernameOrEmail: string;

    @IsString()
    @MinLength(6)
    password: string;
}