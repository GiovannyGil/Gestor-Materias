create database gestorproyectosv1

use gestorproyectosv1

/* crear tabla USUARIOS */
CREATE TABLE USUARIO(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    UID varchar(200) NOT null,
    Nombres varchar(50) NOT null,
    Apellidos varchar(50) not null,
    Username varchar(20) not null,
    email varchar(40) not null,
    pass varchar(30) not null,
    FechaNacimiento date NOT null,
    Foto varchar(100),
    Genero boolean NOT null,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

/* crear tabla MATERIA */
CREATE TABLE MATERIA(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Nombre varchar(50) not null,
    Descripcion varchar(200),
    Aprovacion int,
    Estado int DEFAULT 0 CHECK (Estado IN (0, 1, 2))
);

/* crear tabla TAREA */
CREATE TABLE TAREA(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Nombre varchar(50) not null,
    Descripcion varchar(200),
    Aprovacion int,
	Estado int DEFAULT 0 CHECK (Estado IN (0, 1, 2)),
    FechaLimite date
);

/* tabla para detalles de Materia - Tarea (Relacion) */
CREATE TABLE DetallesMateriaTarea(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    IDMateria int,
    IDTarea int,
    FOREIGN KEY (IDMateria) REFERENCES MATERIA(ID),
    FOREIGN KEY (IDTarea) REFERENCES TAREA(ID)
);

/* tabla de videos */
CREATE TABLE VIDEO(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Titulo varchar(15) not null,
    Descripcion varchar (200),
    Upload varchar(100),
    Link varchar(100)
);

/* tabla para detalles de Tarea - Video (Relacion) */
CREATE TABLE DetalleTareaVideo(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    IDTarea int,
    IDVideo int,
    FOREIGN KEY (IDTarea) REFERENCES TAREA(ID),
    FOREIGN KEY (IDVideo) REFERENCES VIDEO(ID)
);

/* tabla de audios */
CREATE TABLE AUDIO(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Titulo varchar(15) not null,
    Descripcion varchar (200),
    Upload varchar(100),
    Link varchar(100)
);

/* tabla para detalles de Tarea - Audio (Relacion) */
CREATE TABLE DetalleTareaAudio(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    IDTarea int,
    
    IDAudio int,
    FOREIGN KEY (IDTarea) REFERENCES TAREA(ID),
    FOREIGN KEY (IDAudio) REFERENCES AUDIO(ID)
);

/* tabla de imagenes */
CREATE TABLE IMAGEN(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Titulo varchar(15) not null,
    Descripcion varchar (200),
    Upload varchar(100),
    Link varchar(100)
);

/* tabla para detalles de Tarea - Imagen (Relacion) */
CREATE TABLE DetalleTareaImagen(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    IDTarea int,
    IDImagen int,
    FOREIGN KEY (IDTarea) REFERENCES TAREA(ID),
    FOREIGN KEY (IDImagen) REFERENCES IMAGEN(ID)
);

/* Tabla de documentos */
CREATE TABLE DOCUMENTOS(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    Titulo varchar(15) not null,
    Descripcion varchar (200),
    Upload varchar(100),
    Link varchar(100)
);

/* tabla para detalles de Tarea - Documentos (Relacion) */
CREATE TABLE DetalleTareaVideo(
	ID int NOT null AUTO_INCREMENT PRIMARY KEY,
    IDTarea int,
    IDDocs int,
    FOREIGN KEY (IDTarea) REFERENCES TAREA(ID),
    FOREIGN KEY (IDDocs) REFERENCES DOCUMENTOS(ID)
);