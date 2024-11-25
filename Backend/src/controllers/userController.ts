/**
 * @module UserController
 * @description This module defines the UserController class, which handles user-related HTTP requests.
 * 
 * @class UserController
 * @description Controller class for handling user-related HTTP requests.
 * 
 * @constructor
 * @param {addUserService} addUserService - An instance of addUserService to handle user operations.
 * 
 * @method addUser
 * @description Handles the HTTP POST request to add a new user.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */

import { Request, Response } from 'express';
import { addUserService } from '../services/addUserService';
import { UserBuilder } from '../models/user';
import { verifyToken } from '../services/handleJWTService';


/**
 * @class UserController
 * @description Controller class for handling user-related HTTP requests.
 */
export class UserController {
    private addUserService: addUserService;

    constructor(addUserService: addUserService) {
        this.addUserService = addUserService;
    }

    async addUser(req: Request, res: Response): Promise<void> {
        try {

            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Login First' });
                return;
            }

            // Verify the token
            const tokenVerified = verifyToken(token);
            if (!tokenVerified) {
                res.status(401).json({ message: 'Unauthorized User here' });
                return;
            }

            if (tokenVerified.role !== 'Admin' && tokenVerified.role !== 'HR Manager') {
                res.status(403).json({ message: 'You dont have the access to do that' });
                return;
            }


            // Build the user object from request body
            const userBuilder = new UserBuilder()
                .setFirstName(req.body.first_name)
                .setLastName(req.body.last_name)
                .setAddress(req.body.address)
                .setGender(req.body.gender)
                .setDOB(new Date(req.body.dob))  // Ensuring date conversion
                .setTelephone(req.body.telephone)
                .setAge(req.body.age)
                .setSalary(req.body.salary)
                .setImage(req.body.image)  // Handle binary data as necessary
                .setPassword(req.body.password) 
                .setRole(req.body.role)
                 // Adding password to the builder

            const user = userBuilder.build();
            const newUser = await this.addUserService.addUser(user);

            if (newUser) {
                res.status(201).json({message: "successfully added new user", user_id: newUser.user_id});
            } else {
                res.status(400).json({ message: 'User could not be created' });
            }
        } catch (error) {
            console.error('Failed to add user.', error);
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}