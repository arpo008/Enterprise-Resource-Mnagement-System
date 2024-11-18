"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserService = void 0;
const index_1 = __importDefault(require("../database/index"));
const userQueries_1 = require("../queries/userQueries");
class addUserService {
    async addUser(user) {
        const { first_name, last_name, address, gender, dob, telephone, age, salary, image, role } = user;
        const values = [first_name, last_name, address, gender, dob, telephone, age, salary, image, role];
        const result = await index_1.default.query(userQueries_1.insertNewUser, values);
        return result.rows[0];
    }
}
exports.addUserService = addUserService;
//# sourceMappingURL=addUserService.js.map