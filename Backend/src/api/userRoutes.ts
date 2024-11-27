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

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { addUserService } from '../services/addUserService';
import { logInService } from '../services/logInService';
import { LoginController } from '../controllers/loginController';


const router = Router();
const userService = new addUserService();
const userController = new UserController(userService);
const loginController = new LoginController();


// router.post('/addNewUser', userController.addUser.bind(userController));
router.post('/addNewUser', (req, res) => {
  userController.addUser(req, res);
});

router.post('/login', (req, res) => {
  console.log("print hoisi!!!");
  loginController.logIn(req, res);
});


router.get('/', (req, res) => {
    res.send('-----------------hi-----------------');
  });

export default router;
