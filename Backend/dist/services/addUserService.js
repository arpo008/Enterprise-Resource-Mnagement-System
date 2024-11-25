"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserService = void 0;
const index_1 = __importDefault(require("../database/index"));
const userQueries_1 = require("../queries/userQueries");
const bcrypt_1 = __importDefault(require("bcrypt"));
class addUserService {
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { first_name, last_name, address, gender, dob, telephone, age, salary, image, role, password } = user;
            try {
                // Hash the password before inserting into the database
                const hashedPassword = yield bcrypt_1.default.hash(password, 10); // Salt rounds are typically 10 or 12
                // Include the hashed password in the values array that will be sent to the database
                const values = [first_name, last_name, address, gender, dob, telephone, age, salary, image, role, hashedPassword];
                const result = yield index_1.default.query(userQueries_1.insertNewUser, values);
                // Return the user if a row is inserted and available
                return ((_a = result.rows) === null || _a === void 0 ? void 0 : _a[0]) || null;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error executing query:', error.message);
                    throw new Error('Failed to insert new user');
                }
                else {
                    console.error('An unknown error occurred:', error);
                    throw new Error('An unknown error occurred');
                }
            }
        });
    }
}
exports.addUserService = addUserService;
//# sourceMappingURL=addUserService.js.map