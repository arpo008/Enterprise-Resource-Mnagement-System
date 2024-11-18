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

export class User {
  user_id: number | null;
  first_name: string;
  last_name: string;
  address: string;
  gender: string;
  dob: Date;
  telephone: string;
  age: number;
  salary: number;
  image: Buffer | null;  // Assuming the image is stored as a binary data
  role: string;

  constructor(
      first_name: string = 'First Name Not provided',
      last_name: string = 'Last Name Not provided',
      address: string = '',
      gender: string = '',
      dob: Date = new Date(),
      telephone: string = '',
      age: number = 0,
      salary: number = 0.0,
      image: Buffer | null = null,
      role: string = 'user'
  ) {
      this.user_id = null;  // user_id is auto-assigned by the database
      this.first_name = first_name;
      this.last_name = last_name;
      this.address = address;
      this.gender = gender;
      this.dob = dob;
      this.telephone = telephone;
      this.age = age;
      this.salary = salary;
      this.image = image;
      this.role = role;
  }

  // Method to display user information
  displayUserInfo(): void {
      console.log(`User Info: ID = ${this.user_id}, Name = ${this.first_name} ${this.last_name}, Role = ${this.role}`);
  }
}

export class UserBuilder {
  private user: User;

  constructor() {
      this.user = new User();  // Start with an empty User object
  }

  setId(user_id: number): UserBuilder {
      this.user.user_id = user_id;
      return this;
  }

  setFirstName(first_name: string): UserBuilder {
      this.user.first_name = first_name;
      return this;
  }

  setLastName(last_name: string): UserBuilder {
      this.user.last_name = last_name;
      return this;
  }

  setAddress(address: string): UserBuilder {
      this.user.address = address;
      return this;
  }

  setGender(gender: string): UserBuilder {
      this.user.gender = gender;
      return this;
  }

  setDOB(dob: Date): UserBuilder {
      this.user.dob = dob;
      return this;
  }

  setTelephone(telephone: string): UserBuilder {
      this.user.telephone = telephone;
      return this;
  }

  setAge(age: number): UserBuilder {
      this.user.age = age;
      return this;
  }

  setSalary(salary: number): UserBuilder {
      this.user.salary = salary;
      return this;
  }

  setImage(image: Buffer): UserBuilder {
      this.user.image = image;
      return this;
  }

  setRole(role: string): UserBuilder {
      this.user.role = role;
      return this;
  }

  build(): User {
      return this.user;  // Return the fully constructed User object
  }
}
