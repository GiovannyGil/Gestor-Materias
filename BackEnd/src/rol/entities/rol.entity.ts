import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity( {name: 'rol'})
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 10, nullable: false })
    nombre: string;
    @Column({ length: 100, nullable: true })
    descripcion: string;
}
