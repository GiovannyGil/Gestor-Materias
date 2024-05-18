import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  async create(@Body() createRolDto: CreateRolDto) {
    try {
        const RolCreado = await this.rolService.create(createRolDto);
        return { message: 'Rol creado con exito', RolCreado }
    } catch (error) {
        return { message: 'Error al crear el rol', error }
    }
  }

  @Get()
  async findAll() {
    try {
        const Roles = await this.rolService.findAll();
        return Roles 
    } catch (error) {
      throw new HttpException('Error al obtener los Roles (Controller)', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
        const Rol = await this.rolService.findOne(+id);
        return { Rol }
    } catch (error) {
        return { message: 'Error al buscar el rol', error }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    try {
        const UpdateRol = await this.rolService.update(+id, updateRolDto);
        return { message: 'Rol actualizado con exito', UpdateRol }
    } catch (error) {
        return { message: 'Error al actualizar el rol', error }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
        const DeleteRol = await this.rolService.remove(+id);
        return { message: 'Rol eliminado con exito', DeleteRol }
    } catch (error) {
        return { message: 'Error al eliminar el rol', error }
    }
  }
}
