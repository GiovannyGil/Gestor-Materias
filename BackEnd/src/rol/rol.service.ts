import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }


  // FUNCION PARA CREAR ROLES DE FORMA AUTOMATICA
  private async CreateRolDefault(){
    const Roles = [
      { nombre: 'Administrador', descripcion: 'Rol de administrador con todos los permisos' },
      { nombre: 'Usuario', descripcion: 'Rol de usuario con permisos limitados, permiso sobre su perfil y creaciones (CRUD)' },
      { nombre: 'Invitado', descripcion: 'Rol de invitado solo con Permisos de Leer' }
    ]

    //  verificar si existen roles en la base de datos
    for (const role of Roles) {
        const existingRole = await this.rolRepository.findOne({ where: { nombre: role.nombre } });
      if (!existingRole) {
        const newRole = this.rolRepository.create(role);
        await this.rolRepository.save(newRole);
      }
    }

  }

  // Funcion para crear un rol
  async create(createRolDto: CreateRolDto) {
    try {
        const newRol = this.rolRepository.create(createRolDto);
        const RolCreado = await this.rolRepository.save(newRol);
        return { RolCreado }
    } catch (error) {
        return { message: 'Error al crear el rol (Service)', error }
    }
  }


  // Funcion para listar todos los roles
  async findAll() {
    try {
        await this.CreateRolDefault()
        const Roles = await this.rolRepository.find();
        return Roles 
    } catch (error) {
        console.log('Hubo un error al listar los roles (Service)', error)
    }
  }

  // Funcion para buscar un rol por ID
  async findOne(id: number) {
    try {
        const Rol = await this.rolRepository.findOne({ where: { id } });
        if (!Rol) {
          return { message: 'Rol no encontrado' }
        }
        return { Rol }
    } catch (error) {
        return { message: 'Error al buscar el rol', error }
    }
  }

  // Funcion para actualizar un rol
  async update(id: number, updateRolDto: UpdateRolDto) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });
      if (!rol) {
        return { message: 'Rol no encontrado' }
      }
      this.rolRepository.merge(rol, updateRolDto);
      const RolEncontrado =  await this.rolRepository.save(rol);
      return { RolEncontrado }
    } catch (error) {
      return { message: 'Error al actualizar el rol', error }
    }
  }

  // Funcion para eliminar un rol
  async remove(id: number) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });
      if (!rol) {
        return { message: 'Rol no encontrado' }
      }
      const RolEliminado = await this.rolRepository.remove(rol);
      return { RolEliminado }
    } catch (error) {
      return { message: 'Error al eliminar el rol', error }
    }
  }
}
