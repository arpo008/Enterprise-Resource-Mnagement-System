"use strict";
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
exports.logInService = void 0;
const index_1 = __importDefault(require("../database/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userQueries_1 = require("../queries/userQueries");
const logInService = (user_id, providedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_1.default.query(userQueries_1.loginUser, [user_id]);
        if (result.rows.length === 0) {
            return { error: 'User not found' };
        }
        const passwordMatch = yield bcrypt_1.default.compare(providedPassword, result.rows[0].password);
        if (!passwordMatch) {
            return { error: 'Wrong Password' };
        }
        else {
            const userData = `user_id: ${result.rows[0].user_id}, role: ${result.rows[0].role}`;
            const hashedUserData = yield bcrypt_1.default.hash(userData, 10);
            return {
                message: 'Login successful',
                web_tokens: hashedUserData
            };
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        return { error: 'An error occurred during login' };
    }
});
exports.logInService = logInService;
//# sourceMappingURL=logInService.js.map