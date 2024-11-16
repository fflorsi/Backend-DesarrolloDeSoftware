import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {User} from './user.model.js';
import { Client } from '../client/client.model.js';
import jwt from 'jsonwebtoken';
import sequelize from '../db/connection.js';

export const newUser = async (req: Request, res: Response) => {
    const { user, client } = req.body;

    if (!user || !client) {
        return res.status(400).json({ msg: 'Faltan datos de usuario o cliente.' });
    }

    // Destructurar las propiedades adecuadamente
    const { username, password } = user;
    const { dni, firstname, lastname, address, phone, email, birthDate } = client;

    // Validar que todos los campos requeridos estén presentes
    if (!username || !password || !dni || !firstname || !lastname || !address || !phone || !email || !birthDate) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }

    console.log('Datos recibidos:', req.body);

    // Validar Usuario
    const userNew = await User.findOne({ where: { username } });

    if (userNew) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Crear cliente
        const client = await Client.create(
            {
                dni,
                firstname,
                lastname,
                address,
                phone,
                email,
                birthDate,
            },
            { transaction } // Pasar la transacción
        );

        // Crear usuario
        await User.create(
            {
                username,
                password: hashedPassword,
                clientId: client.id 
            },
            { transaction } // Pasar la transacción
        );

        // Confirmar la transacción
        await transaction.commit();

        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        });
    } catch (error: unknown) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error creando usuario', error);

        // Comprobar el tipo de error y acceder a las propiedades necesarias
        if (error instanceof Error) {
            res.status(400).json({
                msg: 'Upps ocurrió un error al crear el usuario.',
                error: error.message // Obtener el mensaje de error
            });
        } else {
            res.status(400).json({
                msg: 'Upps ocurrió un error desconocido.',
                error // En caso de error no estándar
            });
        }
    }
}

export const loginUser = async (req: Request, res:Response) =>{
  console.log(req.body)

  const { username, password } = req.body;

   // Validamos si el usuario existe en la base de datos
   const user: any = await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Contraseña Incorrecta`
    })
   }

   // Generamos token
   const token = jwt.sign({
    username: username
   }, process.env.SECRET_KEY || 'pepito123');
   
   res.json(token);
}