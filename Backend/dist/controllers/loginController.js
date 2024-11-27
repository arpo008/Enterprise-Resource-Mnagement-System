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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const logInService_1 = require("../services/logInService");
class LoginController {
    // Note: Assuming logInService is a static method or a separately imported function
    // If logInService is supposed to be an instance method, you'll need to instantiate it differently
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, password } = req.body;
                // Call the login service with user provided ID and password
                const result = yield (0, logInService_1.logInService)(user_id, password);
                // Handle the result based on the login attempt outcome
                if (result.error) {
                    if (result.error === 'User not found' || result.error === 'Wrong Password') {
                        // Send 401 for authentication related errors
                        res.status(401).json({ message: result.error });
                    }
                    else {
                        // Handle other errors that might occur during the login process
                        res.status(500).json({ message: result.error });
                    }
                }
                // If login is successful, return the appropriate data
                res.status(200).json({
                    message: result.message,
                    web_tokens: result.web_tokens
                });
            }
            catch (error) {
                console.error('Server Error:', error);
                // Capture and return any unexpected errors
                res.status(500).json({
                    message: 'An unknown error occurred during login'
                });
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map