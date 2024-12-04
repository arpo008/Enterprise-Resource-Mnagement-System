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
            const client = database.getClient();   
            
            let staus = await client.query(loginQuery, [user_id, 'active']);

            if (staus.rows.length === 0) {
                return { error: 'An error occurred during login' };
            }

            const token = generateToken(userData);
            return { message: 'Login successful', web_tokens: token };
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'An error occurred during login' };
    }
};