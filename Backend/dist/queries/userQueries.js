"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.insertNewUser = exports.getAllUsers = exports.getUserById = void 0;
const getUserById = `
  SELECT * FROM users WHERE id = $1;
`;
exports.getUserById = getUserById;
const getAllUsers = `
  SELECT * FROM users;
`;
exports.getAllUsers = getAllUsers;
const insertNewUser = `
  INSERT INTO users(first_name, last_name, address, gender, dob, telephone, age, salary, image, role) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
  RETURNING *;
`;
exports.insertNewUser = insertNewUser;
const loginUser = `
  SELECT * FROM users WHERE user_id = $1;
`;
exports.loginUser = loginUser;
//# sourceMappingURL=userQueries.js.map