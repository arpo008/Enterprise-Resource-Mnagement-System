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

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './API/userRoutes';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;