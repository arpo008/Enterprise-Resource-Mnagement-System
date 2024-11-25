import { Request, Response } from 'express';
import { logInService } from '../services/logInService';

export class LoginController {
    // Note: Assuming logInService is a static method or a separately imported function
    // If logInService is supposed to be an instance method, you'll need to instantiate it differently

    async logIn(req: Request, res: Response): Promise<void> {
        try {
            const { user_id, password } = req.body;

            // Call the login service with user provided ID and password
            const result = await logInService(user_id, password);

            // Handle the result based on the login attempt outcome
            if (result.error) {
                if (result.error === 'User not found' || result.error === 'Wrong Password') {
                    // Send 401 for authentication related errors
                    res.status(401).json({ message: result.error });
                } else {
                    // Handle other errors that might occur during the login process
                    res.status(500).json({ message: result.error });
                }
            }

            // If login is successful, return the appropriate data
            res.cookie('authToken', result.web_tokens, {
                httpOnly: true,    // The cookie is not accessible via client-side JS
                secure: process.env.NODE_ENV !== 'development',  // Use secure in production
                maxAge: 3600000    // Cookie expiration time in milliseconds
            });
            
            res.status(200).json({
                message: result.message,
                web_tokens: result.web_tokens
            });
        } catch (error) {
            console.error('Server Error:', error);
            // Capture and return any unexpected errors
            res.status(500).json({
                message: 'An unknown error occurred during login'
            });
        }
    }
}
