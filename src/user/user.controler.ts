import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {User} from './user.model.js';
import { Client } from '../client/client.model.js';
import { Professional } from '../professional/professional.model.js';
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
            { username,
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

export const loginUser  = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                msg: 'Debe proporcionar un nombre de usuario y una contraseña',
            });
        }

        const user: any = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese nombre de usuario',
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta',
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            process.env.SECRET_KEY || 'pepito123',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        return res.status(500).json({
            msg: 'Ocurrió un error durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.',
        });
    }
}


export const createProfessionalUser = async (req: Request, res:Response) => {
    const { username, password, professionalId } = req.body;

    try {
        // 1. Validar que el professionalId exista
        const professional = await Professional.findByPk(professionalId);
        if (!professional) {
            return res.status(404).json({
                msg: 'El profesional no existe',
            });
        }

        // 2. Validar que el username no esté ya en uso
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                msg: 'El nombre de usuario ya está en uso',
            });
        }

        // 3. Crear el usuario con el role "professional"
        const newUser = await User.create({
            username,
            password, // Asegúrate de hashear la contraseña antes de guardarla
            role: 'professional',
            professionalId,
        });

        return res.status(201).json({
            msg: 'Usuario profesional creado con éxito',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Ocurrió un error al crear el usuario profesional',
        });
    }
}

export const fetchUserProfile = async (req: Request, res: Response) => {
    try {
        // Asegúrate de que el middleware ya haya validado el token y cargado el usuario en req.user
        if (!req.user) {
            return res.status(401).json({ msg: 'Usuario no autenticado' });
        }

        // Extrae los datos del usuario desde req.user
        const user = req.user;

        // Retorna la información del perfil según el rol
        if (user.role === 'client') {
            return res.json({
                id: user.id,
                username: user.username,
                role: user.role,
                clientId: user.clientId, // En el caso de un cliente, este es relevante
            });
        } else if (user.role === 'professional') {
            return res.json({
                id: user.id,
                username: user.username,
                role: user.role,
                professionalId: user.professionalId, // En el caso de un profesional
            });
        }

        return res.status(400).json({ msg: 'Rol de usuario no reconocido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el perfil del usuario' });
    }
}