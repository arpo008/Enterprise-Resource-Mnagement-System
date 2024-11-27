/**
 * @module UserRoutes
 * @description This module defines the routes for user-related HTTP requests.
 */

/**
 * @route POST /api/addNewUser
 * @description Route to add a new user.
 * @access Public
 */

/**
 * @route GET /
 * @description Route to respond with "hi" at the root URL.
 * @access Public
 */
import express from 'express';
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { addUserService } from '../services/addUserService';
import { logInService } from '../services/logInService';
import { LoginController } from '../controllers/loginController';
import { FindUserController } from '../controllers/FindUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import hrManagerValidity  from '../middlewares/HrManagerValidity';


const router = express.Router();
const userService = new addUserService();
const userController = new UserController(userService);
const loginController = new LoginController();
const findUserController = new FindUserController();
const deleteUserController = new DeleteUserController();
const app = express();

// router.post('/addNewUser', userController.addUser.bind(userController));
router.post('/addNewUser', (req, res) => {
  userController.addUser(req, res);
});

router.post('/login', (req, res) => {
  console.log("print hoisi!!!");
  loginController.logIn(req, res);
});

router.post('/findUser', hrManagerValidity, (req, res) => {
  findUserController.findUser(req, res);
});

router.post('/deleteUser', hrManagerValidity, (req, res) => {
  deleteUserController.deleteUser(req, res);
});

router.get('/', (req, res) => {
    res.send('-----------------hi-----------------');
  });

export default router;
