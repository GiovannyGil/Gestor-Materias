import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MateriaModule } from './materia/materia.module';
import { TareaModule } from './tarea/tarea.module';
import { RecursosModule } from './recursos/recursos.module';
import { RolModule } from './rol/rol.module';
import DDBB from './configDB/BataBase';

@Module({
  imports: [
    TypeOrmModule.forRoot(DDBB),
    UsuariosModule,
    MateriaModule,
    TareaModule,
    RecursosModule,
    RolModule,
    // IMPORTART LOS MODULOS DE LAS ENTIDADES
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
