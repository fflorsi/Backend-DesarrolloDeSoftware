// @types/express.d.ts
import { User } from '../user/user.model';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: User; 
            role?: string;
        }
    }
}