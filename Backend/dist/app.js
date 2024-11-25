"use strict";
/**
 * @file app.ts
 * @description This file sets up the Express application, configures middleware, and defines routes.
 *
 * Middleware:
 * - Parses JSON bodies.
 *   @see https://expressjs.com/en/api.html#express.json
 * - Enables Cross-Origin Resource Sharing (CORS).
 *   @see https://expressjs.com/en/resources/middleware/cors.html
 *
 * Routes:
 * - User routes.
 *   @see ./API/userRoutes
 *
 * Server:
 * - The port the application will listen on.
 *   @type {number}
 * - Starts the Express server.
 *   @param {number} PORT - The port number.
 *   @param {Function} callback - The callback function to execute once the server is running.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./API/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', userRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
//# sourceMappingURL=app.js.map