import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly RepoUsuario: Repository<Usuario>
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const UsuarioNuevo = this.RepoUsuario.create(createUsuarioDto)
      const UsuarioCreado = await this.RepoUsuario.save(UsuarioNuevo)
      return UsuarioCreado
    } catch (error) {
      console.log('Hubo un error al crear el usuario en (Service)', error )
    }
  }
  
  async findOneByID(id: number): Promise<Usuario> {
    try {
      const usuario = await this.RepoUsuario.findOne({ where: { id } })
      if (!usuario) return null
      return usuario
      
    } catch (error) {
      console.log('Hubo un error al obtener el usuario por ID en (Service)', error)
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      const usuarios = await this.RepoUsuario.find()
      if (!usuarios || usuarios.length === 0) return []
      return usuarios
      
    } catch (error) {
      console.log('Hubo un error al obtener los usuarios en (Service)', error)
    }
  }

  async findByUsername(username: string): Promise<Usuario> {
    try {
      const usuario = await this.RepoUsuario.findOne({ where: { username } })
      if (!usuario) return null
      return usuario
    } catch (error) {
      console.log('Hubo un error al obtener el usuario por username en (Service)', error )
    }
  }

  async findByEmail(email: string): Promise<Usuario> {
    try {
      const usuario = await this.RepoUsuario.findOne({ where: { email } })
      if (!usuario) return null
      return usuario
    } catch (error) {
      console.log('Hubo un error al obtener el usuario por email en (Service)', error )
    }
  }

  async updateUser(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.findOneByID(id)
      if (!usuario) return null
      const UsuarioActualizado = await this.RepoUsuario.save({ ...usuario, ...updateUsuarioDto })
      return UsuarioActualizado
    } catch (error) {
      console.log('Hubo un error al actualizar el usuario en (Service)', error )
    }
  }

  async removeUser(id: number) {
    try {
      const usuario = await this.findOneByID(id)
      if (!usuario) return null
      const UsuarioEliminado = await this.RepoUsuario.remove(usuario)
      return UsuarioEliminado
    } catch (error) {
      console.log('Hubo un error al eliminar el usuario en (Service)', error )
    }
  }
}
