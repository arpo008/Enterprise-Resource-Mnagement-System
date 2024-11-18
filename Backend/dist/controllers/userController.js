"use strict";
/**
 * @module UserController
 * @description This module defines the UserController class, which handles user-related HTTP requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../models/user");
/**
 * @class UserController
 * @description Controller class for handling user-related HTTP requests.
 */
class UserController {
    /**
     * @constructor
     * @param {addUserService} addUserService - An instance of addUserService to handle user operations.
     */
    constructor(addUserService) {
        this.addUserService = addUserService;
    }
    /**
     * @method addUser
     * @description Handles the HTTP POST request to add a new user.
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @returns {Promise<void>}
     */
    async addUser(req, res) {
        try {
            console.log('Adding a new user...');
            console.log(req.body.first_name);
            const userBuilder = new user_1.UserBuilder()
                .setFirstName(req.body.first_name)
                .setLastName(req.body.last_name)
                .setAddress(req.body.address)
                .setGender(req.body.gender)
                .setDOB(new Date(req.body.dob)) // Assuming dob is passed as a string
                .setTelephone(req.body.telephone)
                .setAge(req.body.age)
                .setSalary(req.body.salary)
                .setImage(req.body.image) // Make sure to handle binary data correctly
                .setRole(req.body.role);
            const user = userBuilder.build();
            const newUser = await this.addUserService.addUser(user);
            res.status(201).json(newUser);
            console.log('User added successfully');
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map