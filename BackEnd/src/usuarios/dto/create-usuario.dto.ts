import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombres: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(40)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    pass: string;

    @IsDateString()
    @IsNotEmpty()
    fechNacimiento: Date;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    Foto: string;

    @IsString()
    @IsNotEmpty()
    genero: string;

}
