import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import Datos from './FilesENV'

// Configuración de la conexión a la base de datos

const DDBB: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DDBB_HOST || Datos.Host,
    port: parseInt(process.env.DDBB_PORT) || Datos.Port,
    username: process.env.DDBB_USER || Datos.User,
    password: process.env.DDBB_PASS || Datos.Password,
    database: process.env.BBDD_NAME || Datos.Database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
}


export default DDBB;