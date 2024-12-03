import DatabaseSingleton from '../database/index';
import bcrypt from 'bcrypt';
import { loginQuery } from '../queries/userQueries';
import { loginUser } from '../queries/userQueries';
import { generateToken } from '../services/handleJWTService';
import { Request, Response } from 'express';

export const logInService = async (user_id: number, providedPassword: string) => {
    try {
        const db = DatabaseSingleton.getInstance().getClient();
        const result = await db.query(loginUser, [user_id]);

        if (result.rows.length === 0) {
            return { error: 'User not found' };
        }

        const passwordMatch = await bcrypt.compare(providedPassword, result.rows[0].password);
        if (!passwordMatch) {
            return { error: 'Wrong Password' }; 
        } else {
            let userData = result.rows[0];
            delete userData.password;
            delete userData.image;

            const database = DatabaseSingleton.getInstance();
<<<<<<< HEAD
            const client = database.getClient();

            const clockInTime = new Date().toISOString();
=======
            const client = database.getClient();   
            
>>>>>>> 6fa3212725685b236cd0b5af781625d5e870dacd
            let staus = await client.query(loginQuery, [user_id, 'active']);

            if (staus.rowCount === 0) {
                return { error: 'An error occurred during login' };
            }

            const token = generateToken(userData);
            return { message: 'Login successful', web_tokens: token };
        }

    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'An error occurred during login' };
    }
}