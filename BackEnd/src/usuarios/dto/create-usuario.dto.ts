import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Usuario } from "../entities/usuario.entity";
import { IsUnique } from "../validators/IsUnique.validator";

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
    @IsUnique(Usuario, 'username', { message: 'Username must be unique' })
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(40)
    @IsUnique(Usuario, 'email', { message: 'Email must be unique' })
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
