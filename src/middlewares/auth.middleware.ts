import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../user/user.model'; // Asegúrate de que este sea tu modelo correcto

export const verifyRole = (requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Obtener el token del encabezado de autorización
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ msg: 'No hay token, autorización denegada' });
            }

            // Decodificar el token
            const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'secretkey');

            // Buscar el usuario en la base de datos
            const user = await User.findOne({ where: { username: decoded.username } });
            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            // Verificar si el rol del usuario está permitido
            if (!requiredRoles.includes(user.role)) {
                return res.status(403).json({ msg: 'Acceso denegado, rol no autorizado' });
            }

            // Adjuntar la información del usuario a la solicitud (opcional)
            req.user = user;

            next(); // Continuar con la siguiente función
        } catch (error) {
            res.status(401).json({ msg: 'Token inválido' });
        }
    };
};
