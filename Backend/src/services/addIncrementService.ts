import { updateUserSalary, findUserQ } from "../queries/userQueries";
import { Request, Response } from 'express';

import DatabaseSingleton from '../database/index';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const deleteUserSchema = z.object({
    "user_id": z.number().int(), // Ensure user_id is a 
    "increment": z.number(),
});

export class addIncrementService {

    async addIncrement (req: Request, res: Response): Promise<void> {

        try {

            // authorize user by token  

            const parsedBody = deleteUserSchema.parse(req.body);
            let { user_id, increment } = parsedBody;

            const db = DatabaseSingleton.getInstance().getClient();
            const userDetails = await db.query(findUserQ, [user_id]);

            if (userDetails.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            let salary = Number(userDetails.rows[0].salary);
            
            increment /= 100;
            let temp = salary * increment;
            salary = salary + temp;
            if (salary < 0) {
                salary = 1;
            }

            const result = await db.query(updateUserSalary, [salary, user_id]);

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            } 

            const user = result.rows[0];

            if (result.rows.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ message: 'New salary is ' + user.salary + 'BDT'});
            }

        } catch (error: any) {
            console.error('Error executing query:', error.message);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid data type"});
            } else {
                res.status(500).json({ message: error.message });
            }
        }

    }
}
