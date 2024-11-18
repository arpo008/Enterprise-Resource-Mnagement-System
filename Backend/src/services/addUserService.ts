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

export class addUserService {
    async addUser(user: User): Promise<User> {
        const { first_name, last_name, address, gender, dob, telephone, age, salary, image, role } = user;
        
        const values = [first_name, last_name, address, gender, dob, telephone, age, salary, image, role];
        
        try {
            const result = await db.query(insertNewUser, values);
        
            // Return the user ID if rows exist, or null if no rows are returned
            return result.rows?.[0]?.user_id || null;
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