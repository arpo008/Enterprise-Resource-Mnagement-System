"use strict";
// models/user.ts
/**
 * @module User
 * @description This module defines the User class, which represents a user in the application.
 *
 * @class User
 * @description Class representing a user.
 *
 * @property {number | null} user_id - The unique identifier for the user, auto-assigned by the database.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} address - The address of the user.
 * @property {string} gender - The gender of the user.
 * @property {Date} dob - The date of birth of the user.
 * @property {string} telephone - The telephone number of the user.
 * @property {number} age - The age of the user.
 * @property {number} salary - The salary of the user.
 * @property {Buffer | null} image - The image of the user, stored as binary data.
 * @property {string} role - The role of the user.
 *
 * @constructor
 * @param {string} [first_name='First Name Not provided'] - The first name of the user.
 * @param {string} [last_name='Last Name Not provided'] - The last name of the user.
 * @param {string} [address=''] - The address of the user.
 * @param {string} [gender=''] - The gender of the user.
 * @param {Date} [dob=new Date()] - The date of birth of the user.
 * @param {string} [telephone=''] - The telephone number of the user.
 * @param {number} [age=0] - The age of the user.
 * @param {number} [salary=0.0] - The salary of the user.
 * @param {Buffer | null} [image=null] - The image of the user, stored as binary data.
 * @param {string} [role='user'] - The role of the user.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = exports.User = void 0;
class User {
    constructor(first_name = 'First Name Not provided', last_name = 'Last Name Not provided', address = '', gender = '', dob = new Date(), telephone = '', age = 0, salary = 0.0, password = '', // Default password value
    image = null, role = 'user') {
        this.user_id = null; // user_id is auto-assigned by the database
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.gender = gender;
        this.dob = dob;
        this.telephone = telephone;
        this.age = age;
        this.salary = salary;
        this.password = password; // Assigning the password
        this.image = image;
        this.role = role;
    }
    // Method to display user information
    displayUserInfo() {
        console.log(`User Info: ID = ${this.user_id}, Name = ${this.first_name} ${this.last_name}, Role = ${this.role}`);
    }
}
exports.User = User;
class UserBuilder {
    constructor() {
        this.user = new User(); // Start with an empty User object
    }
    setId(user_id) {
        this.user.user_id = user_id;
        return this;
    }
    setFirstName(first_name) {
        this.user.first_name = first_name;
        return this;
    }
    setLastName(last_name) {
        this.user.last_name = last_name;
        return this;
    }
    setAddress(address) {
        this.user.address = address;
        return this;
    }
    setGender(gender) {
        this.user.gender = gender;
        return this;
    }
    setDOB(dob) {
        this.user.dob = dob;
        return this;
    }
    setTelephone(telephone) {
        this.user.telephone = telephone;
        return this;
    }
    setAge(age) {
        this.user.age = age;
        return this;
    }
    setSalary(salary) {
        this.user.salary = salary;
        return this;
    }
    setPassword(password) {
        this.user.password = password;
        return this;
    }
    setImage(image) {
        this.user.image = image;
        return this;
    }
    setRole(role) {
        this.user.role = role;
        return this;
    }
    build() {
        return this.user; // Return the fully constructed User object
    }
}
exports.UserBuilder = UserBuilder;
//# sourceMappingURL=user.js.map