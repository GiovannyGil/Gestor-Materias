import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

// hereda de CreateUsuarioDto, con excepcion del campo pass (contraseña)
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    // poner como excepcion el campo pass, el cual no lo debe tomar
    pass: string;
}