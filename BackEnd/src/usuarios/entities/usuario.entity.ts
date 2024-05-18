import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Rol } from 'src/rol/entities/rol.entity'
import { join } from 'path';
@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, nullable: false })
    uid: string;
    // funcion para crear el UID de forma automatica
    @BeforeInsert()
    async createUid() { this.uid = Math.random().toString(36).substring(2) }

    @Column({ length: 50, nullable: false })
    nombres: string;
    @Column({ length: 50, nullable: false })
    apellidos: string;
    @Column({ length: 20, nullable: false, unique: true })
    username: string;
    @Column({ length: 40, nullable: false, unique: true })
    email: string;
    @Column({ length: 30, nullable: false })
    pass: string;
    // funcion para encriptar la contraseña
    @BeforeInsert()
    async hashPassword() { this.pass = await bcrypt.hash(this.pass, 10) }

    @Column({ type: 'date', nullable: false})
    fechNacimiento: Date;
    @Column({ length: 100, nullable: true })
    Foto: string;
    @Column({ type: 'boolean', nullable: false })
    genero: boolean;
    // fecha de registro, debe tomar la fecha actual automa
    @Column({ type: 'date', nullable: false })
    fechRegistro: Date;
    @BeforeInsert()
    async FechaRegistro() { this.fechRegistro = new Date() }

    // AQUI VA EL CAMPO DE LA RELACION CON EL ROL
    @OneToOne(() => Rol)
    @JoinColumn()
    rol: Rol;
}
