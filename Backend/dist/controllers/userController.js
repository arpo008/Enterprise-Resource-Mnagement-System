"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = require("../models/user");
/**
 * @class UserController
 * @description Controller class for handling user-related HTTP requests.
 */
class UserController {
    constructor(addUserService) {
        this.addUserService = addUserService;
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Build the user object from request body
                const userBuilder = new user_1.UserBuilder()
                    .setFirstName(req.body.first_name)
                    .setLastName(req.body.last_name)
                    .setAddress(req.body.address)
                    .setGender(req.body.gender)
                    .setDOB(new Date(req.body.dob)) // Ensuring date conversion
                    .setTelephone(req.body.telephone)
                    .setAge(req.body.age)
                    .setSalary(req.body.salary)
                    .setImage(req.body.image) // Handle binary data as necessary
                    .setRole(req.body.role)
                    .setPassword(req.body.password); // Adding password to the builder
                const user = userBuilder.build();
                const newUser = yield this.addUserService.addUser(user);
                if (newUser) {
                    res.status(201).json(newUser);
                }
                else {
                    res.status(400).json({ message: 'User could not be created' });
                }
            }
            catch (error) {
                console.error('Failed to add user:', error);
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map