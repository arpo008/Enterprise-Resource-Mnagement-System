/**
 * @module addUserService
 * @description This module defines the addUserService class, which handles user-related database operations.
 * 
 * @class addUserService
 * @description Service class for handling user-related database operations.
 * 
 * @method addUser
 * @description Adds a new user to the database.
 * @param {User} user - The user object containing user details.
 * @returns {Promise<User>} - The newly created user object.
 * 
 * @method addUser
 * @description Adds a new user to the database.
 * @param {User} user - The user object containing user details.
 * @returns {Promise<User>} - The newly created user object.  
 */

import db from '../database/index';
import { User } from '../models/user';
import { insertNewUser } from '../queries/userQueries';
import bcrypt from 'bcrypt';

export class addUserService {
    async addUser(user: User): Promise<User | null> {
        const { first_name, last_name, address, gender, dob, telephone, age, salary, image, password, role} = user;
        
        try {
            // Hash the password before inserting into the database
            const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds are typically 10 or 12

            // Include the hashed password in the values array that will be sent to the database
            const values = [first_name, last_name, address, gender, dob, telephone, age, salary, image, hashedPassword, role];
            
            const result = await db.query(insertNewUser, values);
        
            // Return the user if a row is inserted and available
            return result.rows?.[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error executing query:', error.message);
                throw new Error('Failed to insert new user');
            } else {
                console.error('An unknown error occurred:', error);
                throw new Error('An unknown error occurred');
            }
        }
    }
}