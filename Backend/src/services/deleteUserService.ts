import { deleteUserQ } from "../queries/userQueries";
import { Request, Response } from 'express';

import db from '../database/index';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const deleteUserSchema = z.object({
    "user_id": z.number().int(), // Ensure user_id is a number
});

export class deleteUserService {

    async deleteUser (req: Request, res: Response): Promise<void> {

        try {

            // authorize user by token  

            const parsedBody = deleteUserSchema.parse(req.body);
            const { user_id } = parsedBody;

            const result = await db.query(deleteUserQ, [user_id]);

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            } 

            const user = result.rows[0];

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: user.first_name + ' removed from the shop.'});
            }

        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
                return;
            }
            res.status(500).json({ message: error.message });
        }

    }
}
